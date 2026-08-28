// Parser sederhana untuk field array yang diinput lewat <textarea>,
// supaya admin tidak perlu paham JSON untuk mengisi konten.

export function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(arr: string[]): string {
  return (arr ?? []).join("\n");
}

// Format 1 baris: "05.30 - Menuju titik pandang sunrise"
export function parseItinerary(text: string): { time: string; activity: string }[] {
  return linesToArray(text).map((line) => {
    const [time, ...rest] = line.split(" - ");
    return { time: time?.trim() ?? "", activity: rest.join(" - ").trim() };
  });
}

export function itineraryToText(items: { time: string; activity: string }[]): string {
  return (items ?? []).map((i) => `${i.time} - ${i.activity}`).join("\n");
}

// Format 1 baris: "Apakah perlu mendaki? :: Tidak, jeep antar langsung."
export function parseFaq(text: string): { question: string; answer: string }[] {
  return linesToArray(text).map((line) => {
    const [question, ...rest] = line.split("::");
    return { question: question?.trim() ?? "", answer: rest.join("::").trim() };
  });
}

export function faqToText(items: { question: string; answer: string }[]): string {
  return (items ?? []).map((i) => `${i.question} :: ${i.answer}`).join("\n");
}
