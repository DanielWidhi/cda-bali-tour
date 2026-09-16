import type { LocalizedText, LocalizedItineraryItem, LocalizedFaqItem } from "@/lib/localization";

export function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(arr: string[]): string {
  return (arr ?? []).join("\n");
}

// ===== Field bilingual sederhana (shortDescription, description) =====
export function buildLocalizedText(idText: string, enText: string): LocalizedText {
  return { id: idText.trim(), en: enText.trim() || undefined };
}

// ===== Array bilingual baris-per-baris (highlights, includes, excludes) =====
// Admin isi N baris di tab ID, lalu N baris di tab EN (urutan harus sama).
export function buildLocalizedArray(idText: string, enText: string): LocalizedText[] {
  const idLines = linesToArray(idText);
  const enLines = linesToArray(enText);
  return idLines.map((id, i) => ({ id, en: enLines[i]?.trim() || undefined }));
}

export function localizedArrayToLines(arr: LocalizedText[] | null | undefined) {
  const items = Array.isArray(arr) ? arr : [];
  return {
    id: items.map((i) => i.id).join("\n"),
    en: items.map((i) => i.en ?? "").join("\n"),
  };
}

// ===== Itinerary: ID format "05.30 - Aktivitas", EN cukup "Activity" per baris =====
export function buildLocalizedItinerary(idText: string, enText: string): LocalizedItineraryItem[] {
  const idLines = linesToArray(idText).map((line) => {
    const [time, ...rest] = line.split(" - ");
    return { time: time?.trim() ?? "", activity: rest.join(" - ").trim() };
  });
  const enLines = linesToArray(enText);
  return idLines.map((item, i) => ({
    time: item.time,
    activity: { id: item.activity, en: enLines[i]?.trim() || undefined },
  }));
}

export function localizedItineraryToLines(items: LocalizedItineraryItem[] | null | undefined) {
  const arr = Array.isArray(items) ? items : [];
  return {
    id: arr.map((i) => `${i.time} - ${i.activity.id}`).join("\n"),
    en: arr.map((i) => i.activity.en ?? "").join("\n"),
  };
}

// ===== FAQ: format "Pertanyaan :: Jawaban" di kedua bahasa =====
export function buildLocalizedFaq(idText: string, enText: string): LocalizedFaqItem[] {
  const parseLine = (line: string) => {
    const [q, ...rest] = line.split("::");
    return { question: q?.trim() ?? "", answer: rest.join("::").trim() };
  };
  const idLines = linesToArray(idText).map(parseLine);
  const enLines = linesToArray(enText).map(parseLine);
  return idLines.map((item, i) => ({
    question: { id: item.question, en: enLines[i]?.question || undefined },
    answer: { id: item.answer, en: enLines[i]?.answer || undefined },
  }));
}

export function localizedFaqToLines(items: LocalizedFaqItem[] | null | undefined) {
  const arr = Array.isArray(items) ? items : [];
  return {
    id: arr.map((i) => `${i.question.id} :: ${i.answer.id}`).join("\n"),
    en: arr
      .map((i) => (i.question.en || i.answer.en ? `${i.question.en ?? ""} :: ${i.answer.en ?? ""}` : ""))
      .join("\n"),
  };
}
