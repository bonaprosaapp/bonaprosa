"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { signIn, signUp } from "@/integrations/supabase/client";
import styles from "./page.module.css";

export default function EntrarPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "login") {
        await signIn(email, password);
        router.push("/dashboard");
      } else {
        const result = await signUp(email, password);
        if (result.access_token) {
          router.push("/dashboard");
        } else {
          setMessage("Cadastro realizado. Confirme seu e-mail antes de entrar.");
          setMode("login");
        }
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível continuar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <Link href="/" aria-label="Voltar para o início"><Logo priority /></Link>
        <p className={styles.eyebrow}>Sua evolução começa aqui</p>
        <h1>{mode === "login" ? "Entre na sua conta" : "Crie sua conta"}</h1>
        <p className={styles.description}>Use apenas seu e-mail e uma senha segura.</p>

        <div className={styles.switcher} role="tablist" aria-label="Acesso">
          <button type="button" data-active={mode === "login"} onClick={() => setMode("login")}>Entrar</button>
          <button type="button" data-active={mode === "cadastro"} onClick={() => setMode("cadastro")}>Cadastrar</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>E-mail<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Senha<input type="password" minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          {message && <p className={styles.success} role="status">{message}</p>}
          <button className={styles.submit} disabled={loading}>{loading ? "Conectando..." : mode === "login" ? "Entrar" : "Criar conta"}</button>
        </form>
      </section>
    </main>
  );
}
