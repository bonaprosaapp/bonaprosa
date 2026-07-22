import { Logo } from "@/components/brand/Logo";
import { BonoMascot } from "@/components/brand/BonoMascot";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { foundationStatus } from "@/content/foundation";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.copy}>
          <Logo priority />
          <p className={styles.eyebrow}>Etapa 0 · Fundação</p>
          <h1 id="page-title">A base do Bona Prosa está organizada.</h1>
          <p className={styles.lead}>
            Esta tela temporária confirma a estrutura técnica do produto. A
            landing page completa será construída na próxima etapa.
          </p>
          <div className={styles.actions}><ButtonLink href="/entrar">Começar agora</ButtonLink><ButtonLink href="#fundacao" variant="secondary">Conhecer a base</ButtonLink></div>
        </div>

        <BonoMascot mood="relaxed" className={styles.mascot} priority />
      </section>

      <section id="fundacao" className={styles.foundation} aria-labelledby="foundation-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Pronta para evoluir</p>
          <h2 id="foundation-title">Uma fundação pequena, segura e verificável.</h2>
        </div>

        <div className={styles.grid}>
          {foundationStatus.map((item) => (
            <Card key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>

        <Alert title="Escopo preservado" variant="info">
          Autenticação, pagamentos, aulas e análise de voz ainda não foram
          simulados nem conectados. Cada fluxo será implementado por inteiro em
          sua etapa.
        </Alert>
      </section>
    </main>
  );
}

