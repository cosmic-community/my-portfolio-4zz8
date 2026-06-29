import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import type { Project } from '@/types'

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <p className="mt-2 text-muted-foreground">A selection of my recent work.</p>
        </div>
        <Link
          href="/projects"
          className="text-sm font-medium text-accent hover:underline whitespace-nowrap"
        >
          View all →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}