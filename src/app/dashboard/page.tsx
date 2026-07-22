"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { getMyProfile, getValidSession, Profile, signOut, SupabaseSession, updateMyProfile } from "@/integrations/supabase/client";
import styles from "./page.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Carregando sua conta...");

  useEffect(() => {
    void (async () => {
      const current = await getValidSession();
      if (!current) return router.replace("/entrar");
      setSession(current);
      const loaded = await getMyProfile(current);
      setProfile(loaded);
      setName(loaded?.display_name ?? "");
      setStatus("");
    })().catch((error) => setStatus(error instanceof Error ? error.message : "Falha ao carregar."));
  }, [router]);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!session) return;
    setStatus("Salvando...");
    try {
      const updated = await updateMyProfile(session, name);
      setProfile(updated);
      setStatus("Perfil atualizado.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Falha ao salvar.");
    }
  }

  async function leave() {
    await signOut();
    router.replace("/");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}><Logo priority /><button onClick={leave}>Sair</button></header>
      <section className={styles.welcome}>
        <p className={styles.eyebrow}>Dashboard do aluno</p>
        <h1>Olá{profile?.display_name ? `, ${profile.display_name}` : ""}.</h1>
        <p>Seu espaço de desenvolvimento da comunicação já está conectado ao Supabase.</p>
      </section>
      <section className={styles.grid}>
        <article className={styles.card}><span>Progresso semanal</span><strong>0%</strong><p>As aulas e exercícios serão exibidos aqui.</p></article>
        <article className={styles.card}><span>Próximo treino</span><strong>Dicção</strong><p>Prepare-se para praticar a técnica da caneta.</p></article>
        <article className={styles.card}><span>Conta</span><strong>{session?.user.email ?? ""}</strong><p>Perfil protegido por autenticação e RLS.</p></article>
      </section>
      <section className={styles.profile}>
        <h2>Seu perfil</h2>
        <form onSubmit={save}><label>Nome de exibição<input maxLength={100} value={name} onChange={(e) => setName(e.target.value)} /></label><button>Salvar</button></form>
        {status && <p role="status">{status}</p>}
      </section>
    </main>
  );
}
