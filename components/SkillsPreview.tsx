import Link from 'next/link'
import SkillBadge from '@/components/SkillBadge'
import type { Skill } from '@/types'

export default function SkillsPreview({ skills }: { skills: Skill[] }) {
  if (!skills || skills.length === 0) {
    return null
  }

  const displaySkills = skills.slice(0, 8)

  return (
    <section className="bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Skills & Technologies</h2>
            <p className="mt-2 text-muted-foreground">Tools I work with regularly.</p>
          </div>
          <Link
            href="/skills"
            className="text-sm font-medium text-accent hover:underline whitespace-nowrap"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displaySkills.map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}