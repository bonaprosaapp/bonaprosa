export type SupabaseUser = {
  id: string;
  email?: string;
};

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
  user: SupabaseUser;
};

type AuthResponse = SupabaseSession & { error_description?: string; msg?: string };

const SESSION_KEY = "bona-prosa.supabase.session";

function getConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Variáveis públicas do Supabase não configuradas.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

async function parseResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as T & {
    error_description?: string;
    msg?: string;
    message?: string;
  };

  if (!response.ok) {
    throw new Error(
      body.error_description || body.msg || body.message || "Falha ao conectar ao Supabase.",
    );
  }

  return body;
}

function saveSession(session: SupabaseSession) {
  const normalized = {
    ...session,
    expires_at: session.expires_at ?? Math.floor(Date.now() / 1000) + session.expires_in,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
  return normalized;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function readSession(): SupabaseSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SupabaseSession;
  } catch {
    clearSession();
    return null;
  }
}

export async function refreshSession(session: SupabaseSession) {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });
  return saveSession(await parseResponse<AuthResponse>(response));
}

export async function getValidSession() {
  const session = readSession();
  if (!session) return null;

  const expiresAt = session.expires_at ?? 0;
  if (expiresAt > Math.floor(Date.now() / 1000) + 60) return session;

  try {
    return await refreshSession(session);
  } catch {
    clearSession();
    return null;
  }
}

export async function signUp(email: string, password: string) {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/auth/v1/signup`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result = await parseResponse<AuthResponse>(response);
  if (result.access_token) saveSession(result);
  return result;
}

export async function signIn(email: string, password: string) {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return saveSession(await parseResponse<AuthResponse>(response));
}

export async function signOut() {
  const session = readSession();
  const { url, key } = getConfig();

  if (session) {
    await fetch(`${url}/auth/v1/logout`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${session.access_token}`,
      },
    }).catch(() => undefined);
  }
  clearSession();
}

export type Profile = {
  id: string;
  display_name: string | null;
  role: "student" | "admin";
  created_at: string;
  updated_at: string;
};

export async function getMyProfile(session: SupabaseSession) {
  const { url, key } = getConfig();
  const response = await fetch(
    `${url}/rest/v1/profiles?id=eq.${encodeURIComponent(session.user.id)}&select=*`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${session.access_token}`,
      },
      cache: "no-store",
    },
  );
  const rows = await parseResponse<Profile[]>(response);
  return rows[0] ?? null;
}

export async function updateMyProfile(session: SupabaseSession, displayName: string) {
  const { url, key } = getConfig();
  const response = await fetch(
    `${url}/rest/v1/profiles?id=eq.${encodeURIComponent(session.user.id)}`,
    {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ display_name: displayName.trim() || null }),
    },
  );
  const rows = await parseResponse<Profile[]>(response);
  return rows[0] ?? null;
}
