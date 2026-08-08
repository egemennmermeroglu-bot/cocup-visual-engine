export const TEAMS = {
  roketsan1: { label: "ROKETSAN 1" },
  roketsan2: { label: "ROKETSAN 2" },
  aselsan: { label: "ASELSAN" },
  havelsan: { label: "HAVELSAN" },
  koluman: { label: "KOLUMAN" },
  tubitak_sage: { label: "TÜBİTAK SAGE" },
  hukukcular: { label: "HUKUKÇULAR" },
  doktorlar: { label: "DOKTORLAR" }
};

const normalizeText = (v) => v
  .trim()
  .toLocaleLowerCase("tr-TR")
  .replace(/[._-]+/g, " ")
  .replace(/\s+/g, " ");

const aliases = {
  "roketsan 1": "roketsan1",
  "roketsan1": "roketsan1",
  "r1": "roketsan1",
  "roketsan 2": "roketsan2",
  "roketsan2": "roketsan2",
  "r2": "roketsan2",
  "aselsan": "aselsan",
  "havelsan": "havelsan",
  "koluman": "koluman",
  "mercedes koluman": "koluman",
  "tübitak sage": "tubitak_sage",
  "tubitak sage": "tubitak_sage",
  "tübitak": "tubitak_sage",
  "tubitak": "tubitak_sage",
  "sage": "tubitak_sage",
  "hukukçular": "hukukcular",
  "hukukcular": "hukukcular",
  "hakimler": "hukukcular",
  "doktorlar": "doktorlar"
};

export function normalizeTeam(input) {
  const n = normalizeText(String(input || ""));
  return aliases[n] || (Object.prototype.hasOwnProperty.call(TEAMS, n) ? n : null);
}
