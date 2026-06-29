// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const name = getMetafieldValue(project.metadata?.project_name) || project.title
  const description = getMetafieldValue(project.metadata?.short_description)
  const details = getMetafieldValue(project.metadata?.details)
  const image = project.metadata?.featured_image
  const screenshots = project.metadata?.screenshots || []
  const techStack = project.metadata?.tech_stack || []
  const liveUrl = getMetafieldValue(project.metadata?.live_url)
  const githubUrl = getMetafieldValue(project.metadata?.github_url)
  const completionDate = formatDate(project.metadata?.completion_date)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/projects"
        className="text-sm text-accent hover:underline inline-block mb-8"
      >
        ← Back to Projects
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold">{name}</h1>
        {completionDate && (
          <p className="mt-2 text-sm text-muted-foreground">{completionDate}</p>
        )}
        {description && (
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View Live →
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              GitHub →
            </a>
          )}
        </div>
      </header>

      {image && (
        <img
          src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={name}
          width={800}
          height={450}
          className="w-full rounded-xl border border-border mb-8"
        />
      )}

      {techStack.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 text-sm rounded-md bg-muted text-foreground"
              >
                {getMetafieldValue(tech)}
              </span>
            ))}
          </div>
        </div>
      )}

      {details && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">About this project</h2>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {details}
          </div>
        </div>
      )}

      {screenshots.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {screenshots.map((shot, idx) => (
              <img
                key={idx}
                src={`${shot.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                alt={`${name} screenshot ${idx + 1}`}
                width={400}
                height={250}
                className="w-full rounded-lg border border-border"
              />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}