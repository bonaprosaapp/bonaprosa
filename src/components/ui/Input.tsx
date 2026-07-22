import type { ComponentPropsWithoutRef } from "react";

import styles from "./Input.module.css";

export type InputProps = Omit<ComponentPropsWithoutRef<"input">, "id"> & {
  error?: string;
  hint?: string;
  id: string;
  label: string;
  wrapperClassName?: string;
};

export function Input({
  "aria-describedby": externalDescription,
  "aria-invalid": externalInvalidState,
  className: inputClassName,
  error,
  hint,
  id,
  label,
  wrapperClassName,
  ...props
}: InputProps) {
  const descriptionIds = [
    externalDescription,
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const classes = wrapperClassName
    ? `${styles.field} ${wrapperClassName}`
    : styles.field;
  const inputClasses = inputClassName
    ? `${styles.input} ${inputClassName}`
    : styles.input;

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={inputClasses}
        aria-describedby={descriptionIds || undefined}
        aria-invalid={error ? true : externalInvalidState}
        {...props}
      />
      {hint ? (
        <span id={`${id}-hint`} className={styles.hint}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
