import { getMetafieldValue } from '@/lib/cosmic'
import type { Profile } from '@/types'

export default function SocialLinks({ profile }: { profile: Profile | null }) {
  if (!profile) return null

  const github = getMetafieldValue(profile.metadata?.github_url)
  const linkedin = getMetafieldValue(profile.metadata?.linkedin_url)
  const website = getMetafieldValue(profile.metadata?.website_url)
  const email = getMetafieldValue(profile.metadata?.email)

  const items = [
    github && { href: github, label: 'GitHub' },
    linkedin && { href: linkedin, label: 'LinkedIn' },
    website && { href: website, label: 'Website' },
    email && { href: `mailto:${email}`, label: 'Email' },
  ].filter(Boolean) as { href: string; label: string }[]

  if (items.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-sm rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}