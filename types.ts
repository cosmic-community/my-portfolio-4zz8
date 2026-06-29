// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Project object type
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    project_name?: string;
    short_description?: string;
    details?: string;
    featured_image?: CosmicImage;
    screenshots?: CosmicImage[];
    tech_stack?: string[];
    live_url?: string;
    github_url?: string;
    featured?: boolean;
    completion_date?: string;
  };
}

// Skill proficiency type literal
export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

// Skill object type
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    skill_name?: string;
    category?: string;
    proficiency?: SkillProficiency | string;
    icon?: string;
  };
}

// Work Experience object type
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    job_title?: string;
    company_name?: string;
    location?: string;
    company_logo?: CosmicImage;
    start_date?: string;
    current_role?: boolean;
    end_date?: string;
    description?: string;
  };
}

// Profile object type
export interface Profile extends CosmicObject {
  type: 'profile';
  metadata: {
    full_name?: string;
    title_role?: string;
    bio?: string;
    headshot?: CosmicImage;
    email?: string;
    github_url?: string;
    linkedin_url?: string;
    website_url?: string;
  };
}

// Cosmic API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}