import { getWorkExperience } from '@/lib/cosmic'
import ExperienceCard from '@/components/ExperienceCard'

export const metadata = {
  title: 'Experience | My Portfolio',
  description: 'My professional work experience.',
}

export default async function ExperiencePage() {
  const experiences = await getWorkExperience()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Work Experience</h1>
        <p className="mt-3 text-muted-foreground">A timeline of my professional career.</p>
      </div>

      {experiences.length === 0 ? (
        <p className="text-muted-foreground">No work experience found yet.</p>
      ) : (
        <div className="max-w-2xl">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </div>
  )
}