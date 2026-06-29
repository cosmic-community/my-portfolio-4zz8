import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import SocialLinks from '@/components/SocialLinks'
import type { Profile } from '@/types'

export default function Hero({ profile }: { profile: Profile | null }) {
  if (!profile) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4 text-muted-foreground">Add a profile in Cosmic to personalize this page.</p>
      </section>
    )
  }

  const fullName = getMetafieldValue(profile.metadata?.full_name) || profile.title
  const titleRole = getMetafieldValue(profile.metadata?.title_role)
  const bio = getMetafieldValue(profile.metadata?.bio)
  const headshot = profile.metadata?.headshot

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3 text-center md:text-left">
            {titleRole && (
              <p className="text-accent font-medium mb-3 tracking-wide uppercase text-sm">
                {titleRole}
              </p>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hi, I'm <span className="text-gradient">{fullName}</span>
            </h1>
            {bio && (
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                {bio}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                View Work
              </Link>
              {profile.metadata?.email && (
                <a
                  href={`mailto:${getMetafieldValue(profile.metadata.email)}`}
                  className="px-6 py-3 rounded-lg border border-border font-medium hover:bg-muted transition-colors"
                >
                  Get in Touch
                </a>
              )}
            </div>
            <div className="mt-8 flex justify-center md:justify-start">
              <SocialLinks profile={profile} />
            </div>
          </div>
          {headshot && (
            <div className="md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-40" />
                <img
                  src={`${headshot.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt={fullName}
                  width={300}
                  height={300}
                  className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl object-cover border border-border"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}