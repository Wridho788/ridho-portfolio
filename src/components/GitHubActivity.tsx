import Reveal from './Reveal';

const GITHUB_USERNAME = 'Wridho788';

const featuredRepos = [
  {
    name: 'lapakbenz',
    description: 'Community, event, and multi-vendor marketplace platform.',
    url: `https://github.com/${GITHUB_USERNAME}/lapakbenz`,
  },
  {
    name: 'ravasim',
    description: 'Frontend-first eSIM management SaaS dashboard.',
    url: `https://github.com/${GITHUB_USERNAME}/ravasim`,
  },
];

export default function GitHubActivity() {
  return (
    <section id="github-activity" className="py-32 bg-[--color-background]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Development Activity
          </h2>

          <p className="text-[--color-textMuted] max-w-xl mb-12">
            Day-to-day commit activity and source code, alongside the projects
            featured above.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-[--color-surface] border border-white/10 rounded-xl p-6 md:p-8 overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/38BDF8/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
              className="w-full min-w-[640px]"
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4">
              {featuredRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/10 rounded-lg px-4 py-3 hover:border-[--color-primary]/50 transition"
                >
                  <p className="text-sm font-medium">{repo.name}</p>
                  <p className="text-xs text-[--color-textMuted] mt-1">
                    {repo.description}
                  </p>
                </a>
              ))}
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--color-primary] text-sm hover:underline inline-flex items-center gap-1 shrink-0"
            >
              View full GitHub profile →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
