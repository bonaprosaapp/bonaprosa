import Link from "next/link";
import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "medium" | "small";
type ButtonFeedback = "idle" | "success" | "error";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  feedback?: ButtonFeedback;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export type ButtonProps = SharedButtonProps &
  Omit<
    ComponentPropsWithoutRef<"button">,
    "children" | "className" | "disabled"
  > & {
    disabled?: boolean;
    isLoading?: boolean;
  };

export type ButtonLinkProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className">;

function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  const classes = [styles.button, styles[variant], styles[size]];

  if (className) classes.push(className);

  return classes.join(" ");
}

function FeedbackMarker({ feedback }: { feedback: ButtonFeedback }) {
  if (feedback === "idle") return null;

  const isSuccess = feedback === "success";

  return (
    <>
      <span className={styles.feedbackIcon} aria-hidden="true">
        {isSuccess ? "✓" : "!"}
      </span>
      <span className={styles.visuallyHidden}>
        {isSuccess ? "Sucesso: " : "Erro: "}
      </span>
    </>
  );
}

export function Button({
  children,
  className,
  disabled = false,
  feedback = "idle",
  isLoading = false,
  size = "medium",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const ariaBusy = isLoading || props["aria-busy"];

  return (
    <button
      {...props}
      className={getButtonClasses(variant, size, className)}
      data-feedback={feedback}
      disabled={disabled || isLoading}
      aria-busy={ariaBusy || undefined}
      type={type}
    >
      {isLoading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <FeedbackMarker feedback={feedback} />
      <span>{children}</span>
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  feedback = "idle",
  size = "medium",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={getButtonClasses(variant, size, className)}
      data-feedback={feedback}
    >
      <FeedbackMarker feedback={feedback} />
      {children}
    </Link>
  );
}
