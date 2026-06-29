import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import type { Project } from '@/types'

export default function ProjectCard({ project }: { project: Project }) {
  const name = getMetafieldValue(project.metadata?.project_name) || project.title
  const description = getMetafieldValue(project.metadata?.short_description)
  const image = project.metadata?.featured_image
  const techStack = project.metadata?.tech_stack || []
  const featured = project.metadata?.featured

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 hover:-translate-y-1"
    >
      {image && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {featured && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
              Featured
            </span>
          )}
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold group-hover:text-gradient transition-colors">
          {name}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        {techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {getMetafieldValue(tech)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}