import { getProfile, getProjects, getSkills, getWorkExperience } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'
import SkillsPreview from '@/components/SkillsPreview'
import ExperiencePreview from '@/components/ExperiencePreview'
import ContactCta from '@/components/ContactCta'

export default async function HomePage() {
  const [profile, projects, skills, experience] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getWorkExperience(),
  ])

  const featuredProjects = projects.filter((p) => p.metadata?.featured).slice(0, 3)
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3)

  return (
    <div>
      <Hero profile={profile} />
      <FeaturedProjects projects={displayProjects} />
      <SkillsPreview skills={skills} />
      <ExperiencePreview experiences={experience.slice(0, 3)} />
      <ContactCta profile={profile} />
    </div>
  )
}