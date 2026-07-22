import type { ReactNode } from "react";

import styles from "./State.module.css";

type ErrorStateProps = {
  action?: ReactNode;
  description: string;
  title: string;
};

export function ErrorState({ action, description, title }: ErrorStateProps) {
  return (
    <main className={styles.page}>
      <section className={styles.state} aria-labelledby="error-state-title">
        <p className={styles.kicker}>Algo não saiu como esperado</p>
        <h1 id="error-state-title">{title}</h1>
        <p>{description}</p>
        {action ? <div className={styles.action}>{action}</div> : null}
      </section>
    </main>
  );
}

