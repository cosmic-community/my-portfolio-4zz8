import { getMetafieldValue } from '@/lib/cosmic'
import { formatDateRange } from '@/lib/utils'
import type { WorkExperience } from '@/types'

export default function ExperienceCard({ experience }: { experience: WorkExperience }) {
  const jobTitle = getMetafieldValue(experience.metadata?.job_title) || experience.title
  const companyName = getMetafieldValue(experience.metadata?.company_name)
  const location = getMetafieldValue(experience.metadata?.location)
  const description = getMetafieldValue(experience.metadata?.description)
  const logo = experience.metadata?.company_logo
  const dateRange = formatDateRange(
    experience.metadata?.start_date,
    experience.metadata?.end_date,
    experience.metadata?.current_role
  )

  return (
    <div className="relative pl-8 pb-8 border-l border-border last:pb-0">
      <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-start gap-4">
          {logo && (
            <img
              src={`${logo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={companyName}
              width={60}
              height={60}
              className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg">{jobTitle}</h3>
            <p className="text-accent font-medium">{companyName}</p>
            <div className="mt-1 flex flex-wrap gap-x-3 text-sm text-muted-foreground">
              {dateRange && <span>{dateRange}</span>}
              {location && <span>· {location}</span>}
            </div>
          </div>
        </div>
        {description && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  )
}