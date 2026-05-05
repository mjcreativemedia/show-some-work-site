import rawLogs from "./content/logs.json";
import { site, type DailyLog } from "./content/site";
import { toYouTubeEmbedUrl } from "./utils/youtube";

const logs = rawLogs as DailyLog[];
const entries = [...logs].sort((a, b) => b.day - a.day);
const latestEntry = entries[0];
const totalReps = entries.reduce((sum, entry) => sum + getTotalReps(entry), 0);
const totalOutside = entries.reduce((sum, entry) => sum + entry.outside, 0);

function getTotalReps(entry: DailyLog) {
  return entry.pullUps + entry.dips + entry.squats;
}

function getBreakdown(entry: DailyLog) {
  return `${entry.pullUps} pull-ups / ${entry.dips} dips / ${entry.squats} squats`;
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function Video({ entry }: { entry: DailyLog }) {
  const embedUrl = toYouTubeEmbedUrl(entry.video);

  if (!embedUrl) {
    return (
      <div className="grid aspect-video place-items-center border border-black bg-white px-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-black/45">
        YouTube link goes here
      </div>
    );
  }

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

function EntryCard({ entry }: { entry: DailyLog }) {
  return (
    <article className="border-t border-black py-8 first:border-t-0 first:pt-0">
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.82fr)_minmax(18rem,1fr)] md:gap-8">
        <Video entry={entry} />

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="text-2xl font-black uppercase leading-none sm:text-3xl">
              Day {entry.day}
            </h2>
            <p className="font-mono text-sm uppercase text-black/65">
              {formatDate(entry.date)}
            </p>
          </div>

          <p className="mt-2 font-mono text-sm uppercase text-black/65">{entry.location}</p>

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

function LogPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-7">
        <div className="flex items-start justify-between gap-5 border-b border-black pb-5">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em]">
              {site.hashtag}
            </p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              {site.name}
            </h1>
          </div>
          <img
            className="h-16 w-16 shrink-0 border border-black bg-black object-cover sm:h-24 sm:w-24"
            src={site.mark}
            alt=""
            aria-hidden="true"
          />
        </div>

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

export default LogPage;
