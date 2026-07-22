import Image from "next/image";

import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = false }: LogoProps) {
  const classes = className ? `${styles.logo} ${className}` : styles.logo;

  return (
    <span className={classes}>
      <Image
        src="/brand/logos/bona-prosa.png"
        alt="Bona Prosa"
        width={1448}
        height={1086}
        sizes="(max-width: 480px) 160px, 200px"
        priority={priority}
      />
    </span>
  );
}

