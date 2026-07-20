/**
 * Lowercases and strips acute/grave/diaeresis accents for accent-insensitive
 * search matching (e.g. "musica" should match "Música"). Deliberately does
 * NOT strip the tilde on "ñ" (U+0303) — "ñ" is a distinct Spanish letter,
 * not "n" with decoration, so "año" must not normalize to "ano".
 */
const ACUTE_GRAVE_DIAERESIS = new RegExp(
  `[${String.fromCharCode(0x301, 0x300, 0x308)}]`,
  "g"
);

export function normalizeSearchText(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(ACUTE_GRAVE_DIAERESIS, "");
}
