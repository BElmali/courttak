export type DemoMatch = {
  id: string;
  date: string;
  venue: string;
  teamA: [string, string];
  teamB: [string, string];
  winner: "A" | "B";
  duration: string;
  time: string;
};

export const DEMO_MATCHES: DemoMatch[] = [
  {
    id: "1",
    date: "8 Ağu",
    venue: "Kort 2 · Pinar Padel",
    teamA: ["Nik", "Miguel"],
    teamB: ["Frankie", "Sam J."],
    winner: "B",
    duration: "25.1 dk",
    time: "19:22",
  },
  {
    id: "2",
    date: "3 Ağu",
    venue: "Kort 1 · Pinar Padel",
    teamA: ["Burak", "Ege"],
    teamB: ["Deniz", "Can"],
    winner: "A",
    duration: "31.4 dk",
    time: "20:05",
  },
];

export const DEMO_HIGHLIGHTS = [
  { id: "1", label: "En uzun rally", detail: "60 vuruş", duration: "0:48" },
  { id: "2", label: "En hızlı seri", detail: "9 vuruş / 6.2 sn", duration: "0:11" },
  { id: "3", label: "Maç sarsıcı anı", detail: "Winner — Frankie", duration: "0:07" },
];

export const DEMO_SHOT_DOTS: Array<[number, number]> = [
  [40, 210],
  [55, 240],
  [70, 200],
  [48, 260],
  [90, 230],
  [35, 190],
  [60, 270],
  [100, 245],
  [75, 215],
  [52, 225],
];

export function getDemoMatch(id: string): DemoMatch | undefined {
  return DEMO_MATCHES.find((m) => m.id === id);
}
