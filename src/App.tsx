import rawLogs from "./content/logs.json";
import { site, type DailyLog } from "./content/site";
import {
  contentFlow,
  contentFlowIntro,
  workoutDayTypes,
  workoutIntro,
  type ContentFlowItem,
  type WorkoutDayType,
} from "./content/workouts";
import { toYouTubeEmbedUrl } from "./utils/youtube";

const logs = rawLogs as DailyLog[];
const entries = [...logs].sort((a, b) => b.day - a.day);
const latestEntry = entries[0];
const totalReps = entries.reduce((sum, entry) => sum + getTotalReps(entry), 0);
const totalOutside = entries.reduce((sum, entry) => sum + entry.outside, 0);

function getTotalReps(entry: DailyLog) {
  return entry.pullUps + (entry.pushUps ?? 0) + entry.dips + entry.squats;
}

function getBreakdown(entry: DailyLog) {
  const movements = [
    `${entry.pullUps} pull-ups`,
    entry.pushUps ? `${entry.pushUps} push-ups` : "",
    entry.dips ? `${entry.dips} dips` : "",
    `${entry.squats} squats`,
  ].filter(Boolean);

  return movements.join(" / ");
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function Media({ entry }: { entry: DailyLog }) {
  const embedUrl = toYouTubeEmbedUrl(entry.video);

  if (embedUrl) {
    return (
      <iframe
        className="aspect-video w-full border border-black bg-white"
        src={embedUrl}
        title={`Day ${entry.day} video`}
        frameBorder="0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  if (entry.post) {
    return (
      <a
        className="grid aspect-video place-items-center border border-black bg-white p-6 text-center hover:bg-black hover:text-white"
        href={entry.post}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <span className="block font-mono text-xs font-bold uppercase tracking-[0.22em] text-current/55">
            YouTube Post
          </span>
          <span className="mt-3 block text-3xl font-black uppercase leading-none">
            Day {entry.day}
          </span>
          <span className="mt-4 block font-mono text-sm uppercase text-current/65">
            Open field note
          </span>
        </span>
      </a>
    );
  }

  return (
    <div className="grid aspect-video place-items-center border border-black bg-white px-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-black/45">
      YouTube link goes here
    </div>
  );
}

function EntryCard({ entry }: { entry: DailyLog }) {
  return (
    <article className="border-t border-black py-8 first:border-t-0 first:pt-0">
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.82fr)_minmax(18rem,1fr)] md:gap-8">
        <Media entry={entry} />

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="text-2xl font-black uppercase leading-none sm:text-3xl">
              {formatDate(entry.date)}
            </h2>
          </div>

          <p className="mt-2 font-mono text-sm uppercase text-black/65">{entry.location}</p>
          {entry.dayType && (
            <p className="mt-5 text-3xl font-black uppercase leading-none">{entry.dayType}</p>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-y border-black py-5 font-mono text-sm sm:grid-cols-3">
            <div>
              <dt className="uppercase text-black/55">Fasted</dt>
              <dd className="mt-1 text-lg font-bold text-black">{entry.fasted} hrs</dd>
            </div>
            <div>
              <dt className="uppercase text-black/55">Outside</dt>
              <dd className="mt-1 text-lg font-bold text-black">{entry.outside} hrs</dd>
            </div>
            <div>
              <dt className="uppercase text-black/55">Reps</dt>
              <dd className="mt-1 text-lg font-bold text-black">
                {getTotalReps(entry).toLocaleString()}
              </dd>
            </div>
          </dl>

          <p className="mt-5 font-mono text-sm leading-7">{getBreakdown(entry)}</p>
          <p className="mt-4 max-w-prose text-lg leading-8">{entry.notes}</p>
        </div>
      </div>
    </article>
  );
}

function ContentFlowCard({ item }: { item: ContentFlowItem }) {
  return (
    <article className="border-t border-black py-7">
      <div className="grid gap-5 sm:grid-cols-[11rem_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-sm uppercase text-black/55">{item.cadence}</p>
          <h2 className="mt-2 text-3xl font-black uppercase leading-none">{item.name}</h2>
          <p className="mt-3 font-mono text-sm uppercase text-black/65">{item.role}</p>
        </div>
        <div className="grid gap-2 font-mono text-base leading-7 sm:grid-cols-2">
          {item.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function Header({ currentPage }: { currentPage: "log" | "workouts" }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-black pb-5">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">
          {site.hashtag}
        </p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
          {currentPage === "workouts" ? "Workouts" : site.name}
        </h1>
        <nav className="mt-5 flex flex-wrap gap-4 font-mono text-sm font-bold uppercase text-black/65">
          <a className={currentPage === "log" ? "text-black" : "hover:text-black"} href="./">
            Log
          </a>
          <a
            className={currentPage === "workouts" ? "text-black" : "hover:text-black"}
            href="workouts"
          >
            Workouts
          </a>
        </nav>
      </div>
      <img
        className="h-16 w-16 shrink-0 border border-black bg-black object-cover sm:h-24 sm:w-24"
        src={site.mark}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

function WorkoutDayCard({ workout }: { workout: WorkoutDayType }) {
  return (
    <article className="border-t border-black py-8">
      <div className="grid gap-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
        <div>
          <p className="font-mono text-sm uppercase text-black/55">{workout.label}</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none sm:text-4xl">
            {workout.name}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_13rem]">
          <div className="border border-black bg-white p-5">
            <div className="space-y-2 font-mono text-base leading-7">
              {workout.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="font-mono text-sm uppercase text-black/65">
            {workout.purpose && (
              <div>
                <p className="font-bold text-black">Purpose</p>
                {workout.purpose.map((item) => (
                  <p className="mt-2" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            )}
            {workout.energy && (
              <div>
                <p className="font-bold text-black">Energy</p>
                {workout.energy.map((item) => (
                  <p className="mt-2" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            )}
            {workout.philosophy && (
              <p className={workout.purpose ? "mt-6 leading-6 normal-case text-black" : "leading-6 normal-case text-black"}>
                {workout.philosophy}
              </p>
            )}
            {workout.note && (
              <p className="leading-6 normal-case text-black">{workout.note}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkoutsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-7">
        <Header currentPage="workouts" />

        <div className="py-7">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-black/55">
            {workoutIntro.eyebrow}
          </p>
          <p className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            {workoutIntro.title}
          </p>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-black/75">{workoutIntro.text}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        {workoutDayTypes.map((workout) => (
          <WorkoutDayCard key={workout.name} workout={workout} />
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="border-t border-black py-8">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-black/55">
            {contentFlowIntro.eyebrow}
          </p>
          <p className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            {contentFlowIntro.title}
          </p>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-black/75">
            {contentFlowIntro.text}
          </p>
        </div>

        {contentFlow.map((item) => (
          <ContentFlowCard key={item.name} item={item} />
        ))}
      </section>
    </main>
  );
}

function LogPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-7">
        <Header currentPage="log" />

        <div className="grid gap-6 py-7 md:grid-cols-[1fr_15rem] md:items-end">
          <p className="max-w-3xl text-2xl font-black leading-tight sm:text-3xl">
            {site.statement}
          </p>

          {latestEntry && (
            <dl className="grid grid-cols-3 gap-3 border border-black p-4 font-mono text-sm md:grid-cols-1">
              <div>
                <dt className="uppercase text-black/55">Days</dt>
                <dd className="text-2xl font-bold">{entries.length}</dd>
              </div>
              <div>
                <dt className="uppercase text-black/55">Reps</dt>
                <dd className="text-2xl font-bold">{totalReps.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="uppercase text-black/55">Outside</dt>
                <dd className="text-2xl font-bold">{totalOutside}h</dd>
              </div>
            </dl>
          )}
        </div>

        <p className="border-t border-black pt-5 font-mono text-sm uppercase text-black/65">
          Daily log. Newest first.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        {entries.length > 0 ? (
          entries.map((entry) => <EntryCard key={entry.day} entry={entry} />)
        ) : (
          <div className="border-t border-black py-8">
            <p className="font-mono text-sm uppercase text-black/65">Day 1 starts May 5.</p>
            <p className="mt-4 text-2xl font-black">Still here.</p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="border-t border-black py-8">
          <p className="font-mono text-sm uppercase text-black/65">
            {site.trainWithMe.location}
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-none sm:text-6xl">
            {site.trainWithMe.title}
          </h2>
          <div className="mt-6 max-w-xl text-2xl font-black leading-tight">
            {site.trainWithMe.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-6 text-2xl font-black">Text: {site.trainWithMe.text}</p>
        </div>
      </section>
    </main>
  );
}

function App() {
  const pathname = window.location.pathname.replace(/\/$/, "");

  if (pathname.endsWith("/workouts")) {
    return <WorkoutsPage />;
  }

  return <LogPage />;
}

export default App;
