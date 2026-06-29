import { getProjects } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'

export const metadata = {
  title: 'Projects | My Portfolio',
  description: 'Browse all of my projects.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-3 text-muted-foreground">A collection of things I've built.</p>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}