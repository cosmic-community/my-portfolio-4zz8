import { getMetafieldValue } from '@/lib/cosmic'
import SocialLinks from '@/components/SocialLinks'
import type { Profile } from '@/types'

export default function ContactCta({ profile }: { profile: Profile | null }) {
  const email = profile ? getMetafieldValue(profile.metadata?.email) : ''

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 sm:p-14 text-center">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold">Let's Work Together</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or just want to connect? I'd love to hear from you.
          </p>
          {email && (
            <a
              href={`mailto:${email}`}
              className="mt-8 inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Send a Message
            </a>
          )}
          <div className="mt-8 flex justify-center">
            <SocialLinks profile={profile} />
          </div>
        </div>
      </div>
    </section>
  )
}