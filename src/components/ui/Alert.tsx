import type { ReactNode } from "react";

import styles from "./Alert.module.css";

type AlertVariant = "error" | "info" | "success" | "warning";

type AlertProps = {
  children: ReactNode;
  title: string;
  variant?: AlertVariant;
};

export function Alert({ children, title, variant = "info" }: AlertProps) {
  const isUrgent = variant === "error";

  return (
    <div
      className={`${styles.alert} ${styles[variant]}`}
      role={isUrgent ? "alert" : "status"}
    >
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

