import { getMetafieldValue } from '@/lib/cosmic'
import type { Skill } from '@/types'

const proficiencyWidth: Record<string, string> = {
  Beginner: 'w-1/4',
  Intermediate: 'w-1/2',
  Advanced: 'w-3/4',
  Expert: 'w-full',
}

export default function SkillBadge({ skill }: { skill: Skill }) {
  const name = getMetafieldValue(skill.metadata?.skill_name) || skill.title
  const proficiency = getMetafieldValue(skill.metadata?.proficiency)
  const icon = getMetafieldValue(skill.metadata?.icon)
  const widthClass = proficiency ? proficiencyWidth[proficiency] || 'w-1/2' : 'w-1/2'

  return (
    <div className="p-4 rounded-lg bg-card border border-border">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-xl">{icon}</span>}
        <span className="font-medium">{name}</span>
      </div>
      {proficiency && (
        <>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full bg-gradient-to-r from-primary to-accent ${widthClass}`} />
          </div>
          <span className="mt-2 block text-xs text-muted-foreground">{proficiency}</span>
        </>
      )}
    </div>
  )
}