export type WorkoutDayType = {
  name: string;
  label: string;
  purpose?: string[];
  energy?: string[];
  philosophy?: string;
  lines: string[];
  note?: string;
};

export type ContentFlowItem = {
  name: string;
  cadence: string;
  role: string;
  lines: string[];
};

export const workoutIntro = {
  eyebrow: "Day Types",
  title: "Moods, conditions, ways of showing up.",
  text: "The day type comes from the weather, the mood, the energy, and the environment. It should feel observed, not forced.",
};

export const workoutDayTypes: WorkoutDayType[] = [
  {
    name: "Light Day",
    label: "The foundation day.",
    purpose: ["Recovery", "Momentum", "Consistency"],
    philosophy: "Even low effort counts if you show up.",
    lines: ["100 pull-ups", "200 push-ups", "100 squats", "60 min walk", "Still showed up."],
  },
  {
    name: "Volume Day",
    label: "High reps. Endless sets. Sweat.",
    energy: ["Repetitive", "Meditative", "Relentless"],
    lines: ["300 push-ups", "150 pull-ups", "300 squats", "2 hr walk", "Just kept moving."],
  },
  {
    name: "Beach Day",
    label: "Movement, sun, walking.",
    lines: ["Swim", "Walk 5 miles", "50 dips", "Stretching", "Sunset meditation", "Outside all day."],
    note: "A visual day. More lifestyle than numbers.",
  },
  {
    name: "Ladder Day",
    label: "Ascending and descending reps.",
    lines: ["Pull-ups", "1 -> 10 -> 1", "Push-ups", "10 -> 50 -> 10", "Leg raises", "5 -> 25 -> 5"],
  },
  {
    name: "Ghost Day",
    label: "Quiet. Gray skies. Solo.",
    lines: ["Walk 2 hrs", "100 pull-ups", "Breathing work", "No music.", "No phone."],
  },
  {
    name: "Sandbag Day",
    label: "Carry something heavy everywhere.",
    lines: ["Carries", "Hill walks", "Push-ups", "Squats", "Legs cooked."],
  },
  {
    name: "Failure Day",
    label: "You did not have it. Still logged it.",
    lines: ["50 pull-ups", "20 push-ups", "Low energy.", "Could not lock in today.", "Still showed up."],
    note: "This one keeps the whole thing honest.",
  },
  {
    name: "Long Day",
    label: "Outside literally all day.",
    lines: ["Outside: 11 hrs", "Walked: 9 miles", "Pull-ups: 150", "Push-ups: 300", "Sunrise to sunset."],
  },
  {
    name: "Rain Day",
    label: "Train anyway.",
    lines: ["100 dips", "100 pull-ups", "2 mile walk", "Cold rain.", "Stayed anyway."],
  },
  {
    name: "No Count Day",
    label: "No tracking. Just movement.",
    lines: ["Moved all day.", "Did not track it.", "Needed silence more than numbers."],
  },
  {
    name: "Skill Day",
    label: "Balance, mobility, attempts.",
    lines: ["Handstand practice", "L-sits", "Muscle-up attempts", "Mobility work"],
  },
  {
    name: "Sunrise Day",
    label: "Early morning discipline.",
    lines: ["5:42 AM", "Pull-ups", "Dips", "Run by the lake", "City still asleep."],
  },
  {
    name: "Heat Day",
    label: "Train in brutal sun.",
    lines: ["95 degrees", "3 hrs outside", "Sweat pouring", "Stayed out anyway."],
  },
  {
    name: "Silence Day",
    label: "No speaking the entire session.",
    lines: ["No music.", "No talking.", "Just reps."],
  },
];

export const contentFlowIntro = {
  eyebrow: "Content Flow",
  title: "YouTube only. Less performance. More archive.",
  text: "The channel should feel like public time passing: proof, field notes, atmosphere, and occasional longer reflection.",
};

export const contentFlow: ContentFlowItem[] = [
  {
    name: "Shorts",
    cadence: "Daily",
    role: "Proof",
    lines: ["Pull-up clips", "Walking clips", "Lake shots", "Fasted check-ins", "Rain training"],
  },
  {
    name: "Posts",
    cadence: "Daily / Weekly",
    role: "Archive",
    lines: ["Logs", "Photos", "Thoughts", "Day types", "Field notes"],
  },
  {
    name: "Live",
    cadence: "Occasional",
    role: "Presence",
    lines: ["Sunrise sessions", "Walking streams", "Rain training", "Cooldowns", "Quiet reps"],
  },
  {
    name: "Long Form",
    cadence: "Occasional",
    role: "Story",
    lines: ["30 days outside", "Why this started", "Fasting all summer", "The psychology of showing up"],
  },
];
