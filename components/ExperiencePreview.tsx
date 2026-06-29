import Link from 'next/link'
import ExperienceCard from '@/components/ExperienceCard'
import type { WorkExperience } from '@/types'

export default function ExperiencePreview({ experiences }: { experiences: WorkExperience[] }) {
  if (!experiences || experiences.length === 0) {
    return null
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold">Work Experience</h2>
          <p className="mt-2 text-muted-foreground">My professional journey.</p>
        </div>
        <Link
          href="/experience"
          className="text-sm font-medium text-accent hover:underline whitespace-nowrap"
        >
          View all →
        </Link>
      </div>
      <div className="max-w-2xl">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}