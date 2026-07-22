import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const tokens = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");

function readHexToken(name: string) {
  const match = tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"));

  if (!match?.[1]) throw new Error(`Token hexadecimal não encontrado: ${name}`);

  return match[1];
}

function relativeLuminance(hexColor: string) {
  const channels = hexColor
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels || channels.length !== 3) throw new Error("Cor inválida");

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4,
  );

  if (red === undefined || green === undefined || blue === undefined) {
    throw new Error("Cor inválida");
  }

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(firstColor: string, secondColor: string) {
  const luminances = [
    relativeLuminance(firstColor),
    relativeLuminance(secondColor),
  ].sort((first, second) => second - first);
  const lighter = luminances[0];
  const darker = luminances[1];

  if (lighter === undefined || darker === undefined) {
    throw new Error("Não foi possível calcular o contraste");
  }

  return (lighter + 0.05) / (darker + 0.05);
}

describe("tokens de contraste", () => {
  it("usa o verde escuro oficial para ações com texto branco", () => {
    expect(tokens).toContain(
      "--color-action-primary: var(--brand-green-700)",
    );
    expect(
      contrast(
        readHexToken("brand-green-700"),
        readHexToken("neutral-white"),
      ),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("mantém texto de sucesso em um verde com contraste suficiente", () => {
    expect(tokens).toContain("--color-success: var(--brand-green-700)");
    expect(
      contrast(
        readHexToken("brand-green-700"),
        readHexToken("neutral-white"),
      ),
    ).toBeGreaterThanOrEqual(4.5);
  });
});

