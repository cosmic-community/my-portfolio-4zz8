# My Portfolio

![App Preview](https://imgix.cosmicjs.com/572a4770-73a6-11f1-a87f-d72293b1048a-autopilot-photo-1499750310107-5fef28a66643-1782729368880.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive developer portfolio built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Showcase your projects, skills, work experience, and personal profile with a sleek, professional design.

## Features

- 🎨 **Stunning Hero Section** — Dynamic profile-driven homepage with bio, headshot, and social links
- 💻 **Project Showcase** — Beautiful project cards with screenshots, tech stacks, live & GitHub links
- 🛠️ **Skills Display** — Skills organized by category with proficiency indicators
- 💼 **Work Experience Timeline** — Clean, chronological work history with company logos
- 📱 **Fully Responsive** — Looks gorgeous on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads powered by Next.js App Router
- 🌙 **Modern Design System** — Polished UI with smooth transitions and gradients
- 🔗 **SEO-Friendly** — Optimized metadata and semantic markup

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a424a2b5a70784f2710bbd4&clone_repository=6a424b475a70784f2710bc3c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience.
>
> User instructions: A developer portfolio with projects, skills, work experience, and contact info"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Portfolio". The content is managed in Cosmic CMS with the following object types: projects, skills, work-experience, profile. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A developer portfolio with projects, skills, work experience, and contact info

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — React framework with App Router
- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — Type safety
- [Tailwind CSS](https://tailwindcss.com) — Utility-first styling
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `projects`, `skills`, `work-experience`, and `profile` object types

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd my-portfolio
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables. Create a `.env.local` file with:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all projects with nested data
const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single project by slug
const { object: project } = await cosmic.objects
  .findOne({ type: 'projects', slug: 'my-project' })
  .depth(1)

// Fetch the profile (singleton)
const { objects: profiles } = await cosmic.objects
  .find({ type: 'profile' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This portfolio leverages four Cosmic object types:

- **Projects** — `project_name`, `short_description`, `details`, `featured_image`, `screenshots`, `tech_stack`, `live_url`, `github_url`, `featured`, `completion_date`
- **Skills** — `skill_name`, `category`, `proficiency`, `icon`
- **Work Experience** — `job_title`, `company_name`, `location`, `company_logo`, `start_date`, `current_role`, `end_date`, `description`
- **Profile** — `full_name`, `title_role`, `bio`, `headshot`, `email`, `github_url`, `linkedin_url`, `website_url`

All data is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with the `depth` parameter to resolve connected objects. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables
5. Deploy!

<!-- README_END -->