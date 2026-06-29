import { getSkills, getMetafieldValue } from '@/lib/cosmic'
import SkillBadge from '@/components/SkillBadge'
import type { Skill } from '@/types'

export const metadata = {
  title: 'Skills | My Portfolio',
  description: 'Skills and technologies I work with.',
}

export default async function SkillsPage() {
  const skills = await getSkills()

  // Group skills by category
  const grouped: Record<string, Skill[]> = {}
  for (const skill of skills) {
    const category = getMetafieldValue(skill.metadata?.category) || 'Other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(skill)
  }

  const categories = Object.keys(grouped).sort()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Skills</h1>
        <p className="mt-3 text-muted-foreground">Technologies and tools in my toolkit.</p>
      </div>

      {skills.length === 0 ? (
        <p className="text-muted-foreground">No skills found yet.</p>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => {
            const categorySkills = grouped[category]
            if (!categorySkills || categorySkills.length === 0) {
              return null
            }
            return (
              <div key={category}>
                <h2 className="text-xl font-semibold mb-5">{category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}