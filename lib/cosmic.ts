import { createBucketClient } from '@cosmicjs/sdk'
import type { Project, Skill, WorkExperience, Profile } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render metadata values that could be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const projects = response.objects as Project[]

    // Sort featured first, then by completion date (newest first)
    return projects.sort((a, b) => {
      const aFeatured = a.metadata?.featured ? 1 : 0
      const bFeatured = b.metadata?.featured ? 1 : 0
      if (aFeatured !== bFeatured) return bFeatured - aFeatured
      const dateA = new Date(a.metadata?.completion_date || '').getTime()
      const dateB = new Date(b.metadata?.completion_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch projects')
  }
}

// Fetch a single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .depth(1)

    return (response.object as Project) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch project')
  }
}

// Fetch all skills
export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    return response.objects as Skill[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch skills')
  }
}

// Fetch all work experience
export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const experiences = response.objects as WorkExperience[]

    // Sort by start date (newest first)
    return experiences.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime()
      const dateB = new Date(b.metadata?.start_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch work experience')
  }
}

// Fetch the profile (singleton)
export async function getProfile(): Promise<Profile | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'profile' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    const profiles = response.objects as Profile[]
    return profiles.length > 0 && profiles[0] ? profiles[0] : null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch profile')
  }
}