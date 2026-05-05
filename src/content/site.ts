export type DailyLog = {
  day: number;
  date: string;
  location: string;
  fasted: number;
  outside: number;
  pullUps: number;
  dips: number;
  squats: number;
  notes: string;
  video: string;
};

export const site = {
  name: "Show Some Work",
  statement:
    "Spending the summer outside. Training every day. Eating once. No plan. Just showing some work.",
  mark: "/show-some-work-mark.png",
  hashtag: "#showsomework",
  trainWithMe: {
    title: "Train With Me",
    location: "Chicago · Outdoors",
    lines: ["No contracts.", "Just show up and work."],
    text: "773-236-6224",
  },
};
