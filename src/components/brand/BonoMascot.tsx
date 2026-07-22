import Image from "next/image";

export type BonoMood =
  | "angry"
  | "flying"
  | "happy"
  | "relaxed"
  | "surprised"
  | "worried";

const mascotSources: Record<BonoMood, string> = {
  angry: "/mascot/bono-angry.png",
  flying: "/mascot/bono-flying.png",
  happy: "/mascot/bono-happy.png",
  relaxed: "/mascot/bono-relaxed.png",
  surprised: "/mascot/bono-surprised.png",
  worried: "/mascot/bono-worried.png",
};

type BonoMascotProps = {
  alt?: string;
  className?: string;
  mood: BonoMood;
  priority?: boolean;
  sizes?: string;
};

export function BonoMascot({
  alt = "",
  className,
  mood,
  priority = false,
  sizes = "(max-width: 768px) 70vw, 384px",
}: BonoMascotProps) {
  return (
    <Image
      src={mascotSources[mood]}
      alt={alt}
      className={className}
      width={1254}
      height={1254}
      sizes={sizes}
      priority={priority}
    />
  );
}

