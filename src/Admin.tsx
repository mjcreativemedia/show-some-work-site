import { useMemo, useState, type FormEvent } from "react";
import rawLogs from "./content/logs.json";
import { site, type DailyLog } from "./content/site";

const password = "showsomework";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function sortLogs(logs: DailyLog[]) {
  return [...logs].sort((a, b) => b.day - a.day);
}

function getTotalReps(entry: DailyLog) {
  return entry.pullUps + (entry.pushUps ?? 0) + entry.dips + entry.squats;
}

function createBlankLog(logs: DailyLog[]): DailyLog {
  const nextDay = logs.reduce((max, entry) => Math.max(max, entry.day), 0) + 1;

  return {
    day: nextDay,
    date: today(),
    location: "Chicago",
    dayType: "",
    fasted: 18,
    outside: 7,
    pullUps: 0,
    pushUps: 0,
    dips: 0,
    squats: 0,
    notes: "Still here.",
    video: "",
    post: "",
    postImage: "",
  };
}

function numberValue(value: string) {
  return Number.isNaN(Number(value)) ? 0 : Number(value);
}

function AdminPage() {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [unlocked, setUnlocked] = useState(
    () => window.localStorage.getItem("show-some-work-admin") === "unlocked",
  );
  const [logs, setLogs] = useState<DailyLog[]>(() => sortLogs(rawLogs as DailyLog[]));
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [entry, setEntry] = useState<DailyLog>(() =>
    createBlankLog(sortLogs(rawLogs as DailyLog[])),
  );
  const [saveStatus, setSaveStatus] = useState("");

  const updatedLogs = useMemo(() => {
    const withoutCurrentDay = logs.filter((log) => log.day !== entry.day);
    return sortLogs([entry, ...withoutCurrentDay]);
  }, [entry, logs]);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (enteredPassword === password) {
      window.localStorage.setItem("show-some-work-admin", "unlocked");
      setUnlocked(true);
    }
  }

  function startNewDay() {
    setMode("new");
    setEntry(createBlankLog(logs));
    setSaveStatus("");
  }

  function editDay(day: number) {
    const selected = logs.find((log) => log.day === day);

    if (selected) {
      setMode("edit");
      setEntry(selected);
      setSaveStatus("");
    }
  }

  async function saveLog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === "new" && logs.some((log) => log.day === entry.day)) {
      setEntry(createBlankLog(logs));
      setSaveStatus("That day already exists. New day reset to the next day.");
      return;
    }

    setSaveStatus("Saving...");

    try {
      const response = await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLogs),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      setLogs(updatedLogs);
      setMode("edit");
      setSaveStatus("Saved to src/content/logs.json");
    } catch {
      setSaveStatus("Could not save. Run the Vite dev server locally and try again.");
    }
  }

  if (!unlocked) {
    return (
      <main className="grid min-h-screen place-items-center bg-white px-4 text-black">
        <form onSubmit={unlock} className="w-full max-w-sm border border-black p-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">
            {site.hashtag}
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase">Admin</h1>
          <label className="mt-6 block font-mono text-sm uppercase text-black/65">
            Password
            <input
              className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black outline-none"
              type="password"
              value={enteredPassword}
              onChange={(event) => setEnteredPassword(event.target.value)}
              autoFocus
            />
          </label>
          <button
            className="mt-4 w-full border border-black bg-black px-4 py-3 font-mono text-sm font-bold uppercase text-white"
            type="submit"
          >
            Enter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-5 text-black sm:px-6 sm:py-7">
      <section className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-5 border-b border-black pb-5">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">
              {site.hashtag}
            </p>
            <h1 className="mt-3 text-4xl font-black uppercase leading-none sm:text-6xl">
              Daily Log Admin
            </h1>
          </div>
          <a className="font-mono text-sm uppercase text-black/65 hover:text-black" href="./">
            View log
          </a>
        </div>

        <div className="py-7">
          <form className="grid gap-4" onSubmit={saveLog}>
            <div className="grid gap-4 border border-black p-4 sm:grid-cols-[auto_auto_minmax(12rem,1fr)] sm:items-end">
              <div className="grid grid-cols-2 gap-2 sm:flex">
                <button
                  className={`border border-black px-4 py-3 font-mono text-sm font-bold uppercase ${
                    mode === "new" ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={startNewDay}
                >
                  Add New Day
                </button>
                <button
                  className={`border border-black px-4 py-3 font-mono text-sm font-bold uppercase ${
                    mode === "edit" ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  type="button"
                  onClick={() => editDay(logs[0]?.day ?? entry.day)}
                >
                  Edit Existing
                </button>
              </div>

              {mode === "edit" && (
                <label className="font-mono text-sm uppercase text-black/65 sm:col-start-3">
                  Select day
                  <select
                    className="mt-2 w-full border border-black bg-white px-3 py-3 font-sans text-base text-black"
                    value={entry.day}
                    onChange={(event) => editDay(numberValue(event.target.value))}
                  >
                    {logs.map((log) => (
                      <option key={log.day} value={log.day}>
                        Day {log.day} - {log.date}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="font-mono text-sm uppercase text-black/65">
                Day
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black disabled:bg-black/5 disabled:text-black/55"
                  type="number"
                  value={entry.day}
                  min="1"
                  disabled
                  readOnly
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                Date
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="date"
                  value={entry.date}
                  onChange={(event) => setEntry({ ...entry, date: event.target.value })}
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                Location
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="text"
                  value={entry.location}
                  onChange={(event) => setEntry({ ...entry, location: event.target.value })}
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                Day type
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="text"
                  value={entry.dayType ?? ""}
                  placeholder="Light Day"
                  onChange={(event) => setEntry({ ...entry, dayType: event.target.value })}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="font-mono text-sm uppercase text-black/65">
                Fasted
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="number"
                  value={entry.fasted}
                  min="0"
                  onChange={(event) =>
                    setEntry({ ...entry, fasted: numberValue(event.target.value) })
                  }
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                Outside
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="number"
                  value={entry.outside}
                  min="0"
                  onChange={(event) =>
                    setEntry({ ...entry, outside: numberValue(event.target.value) })
                  }
                />
              </label>
              <div className="border border-black px-3 py-3 font-mono text-sm uppercase">
                <p className="text-black/55">Total reps</p>
                <p className="mt-1 text-2xl font-bold text-black">
                  {getTotalReps(entry).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <label className="font-mono text-sm uppercase text-black/65">
                Pull-ups
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="number"
                  value={entry.pullUps}
                  min="0"
                  onChange={(event) =>
                    setEntry({ ...entry, pullUps: numberValue(event.target.value) })
                  }
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                Push-ups
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="number"
                  value={entry.pushUps ?? 0}
                  min="0"
                  onChange={(event) =>
                    setEntry({ ...entry, pushUps: numberValue(event.target.value) })
                  }
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                Dips
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="number"
                  value={entry.dips}
                  min="0"
                  onChange={(event) =>
                    setEntry({ ...entry, dips: numberValue(event.target.value) })
                  }
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                Squats
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="number"
                  value={entry.squats}
                  min="0"
                  onChange={(event) =>
                    setEntry({ ...entry, squats: numberValue(event.target.value) })
                  }
                />
              </label>
            </div>

            <label className="font-mono text-sm uppercase text-black/65">
              Notes
              <textarea
                className="mt-2 min-h-28 w-full border border-black px-3 py-3 font-sans text-base leading-7 text-black"
                value={entry.notes}
                onChange={(event) => setEntry({ ...entry, notes: event.target.value })}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="font-mono text-sm uppercase text-black/65">
                YouTube video link
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="url"
                  value={entry.video}
                  placeholder="https://www.youtube.com/watch?v=XXXX"
                  onChange={(event) => setEntry({ ...entry, video: event.target.value })}
                />
              </label>
              <label className="font-mono text-sm uppercase text-black/65">
                YouTube post link
                <input
                  className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                  type="url"
                  value={entry.post ?? ""}
                  placeholder="https://youtube.com/post/XXXX"
                  onChange={(event) => setEntry({ ...entry, post: event.target.value })}
                />
              </label>
            </div>

            <label className="font-mono text-sm uppercase text-black/65">
              Post image path
              <input
                className="mt-2 w-full border border-black px-3 py-3 font-sans text-base text-black"
                type="text"
                value={entry.postImage ?? ""}
                placeholder="/day-1-youtube-post.webp"
                onChange={(event) => setEntry({ ...entry, postImage: event.target.value })}
              />
            </label>

            <div className="flex flex-col gap-3 border-t border-black pt-5 sm:flex-row sm:items-center">
              <button
                className="border border-black bg-black px-5 py-3 font-mono text-sm font-bold uppercase text-white"
                type="submit"
              >
                {mode === "edit" ? "Save Changes" : "Save New Day"}
              </button>
              {saveStatus && (
                <p className="font-mono text-sm uppercase text-black/65">{saveStatus}</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AdminPage;
