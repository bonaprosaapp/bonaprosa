import styles from "./State.module.css";

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Carregando" }: LoadingStateProps) {
  return (
    <main className={styles.page}>
      <div className={styles.loading} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <span>{label}</span>
      </div>
    </main>
  );
}

