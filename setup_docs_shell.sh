#!/usr/bin/env bash
set -euo pipefail

echo "==> Scaffolding docs shell (sidebar + breadcrumbs + content collections)…"

# Ensure we're in the repo root
if [ ! -d ".git" ]; then
  echo "(!) This doesn't look like the repo root (no .git folder found). Continue anyway? [y/N]"
  read -r ans
  if [[ "${ans:-N}" != "y" && "${ans:-N}" != "Y" ]]; then
    echo "Aborting."; exit 1
  fi
fi

# Directories
mkdir -p public/assets
mkdir -p src/{components,layouts,styles,content/{subjects,courses,concepts},pages/{subjects,courses,concepts}}
touch src/env.d.ts

# -----------------------------
# package.json (create or merge)
# -----------------------------
if [ ! -f package.json ]; then
  echo "-> Creating package.json"
  cat > package.json <<'JSON'
{
  "name": "your-site",
  "private": true,
  "type": "module",
  "dependencies": {
    "astro": "^4.16.6"
  },
  "devDependencies": {
    "@astrojs/mdx": "^3.1.3",
    "@astrojs/tailwind": "^5.1.0",
    "tailwindcss": "^3.4.14",
    "zod": "^3.23.8"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
JSON
else
  echo "-> package.json exists; attempting merge with jq (if available)…"
  if command -v jq >/dev/null 2>&1; then
    cp package.json package.backup.json
    jq '
      .dependencies = (.dependencies // {}) + {"astro":"^4.16.6"} |
      .devDependencies = (.devDependencies // {}) + {
        "@astrojs/mdx":"^3.1.3",
        "@astrojs/tailwind":"^5.1.0",
        "tailwindcss":"^3.4.14",
        "zod":"^3.23.8"
      } |
      .scripts = (.scripts // {}) + {
        "dev":"astro dev",
        "build":"astro build",
        "preview":"astro preview"
      }
    ' package.json > package.merged.json
    mv package.merged.json package.json
    echo "   Merged. Backup saved as package.backup.json"
  else
    echo "   jq not found — skipping auto-merge."
    echo "   Please ensure package.json includes astro, @astrojs/mdx, @astrojs/tailwind, tailwindcss, zod and scripts: dev/build/preview."
  fi
fi

# -----------------------------
# astro.config.mjs
# -----------------------------
cat > astro.config.mjs <<'JS'
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

export default defineConfig({
  integrations: [tailwind(), mdx()],
  experimental: {
    assets: true
  }
})
JS

# -----------------------------
# tailwind.config.mjs
# -----------------------------
cat > tailwind.config.mjs <<'JS'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,md,mdx,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f7ff', 100: '#e6effe', 200: '#c5d8fd',
          300: '#9fbdfc', 400: '#6f97fa', 500: '#3f71f8',
          600: '#2856d7', 700: '#2146ac', 800: '#1d3b8b', 900: '#1b356f'
        }
      }
    }
  }
}
JS

# -----------------------------
# src/env.d.ts
# -----------------------------
cat > src/env.d.ts <<'TS'
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
TS

# -----------------------------
# src/styles/global.css
# -----------------------------
cat > src/styles/global.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root{ --sidebar-w: 280px; }

.prose h1,h2,h3,h4{ scroll-margin-top: 5rem; }

.sidebar-link{ @apply block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm; }
.sidebar-link.active{ @apply bg-gray-200 font-semibold; }
CSS

# -----------------------------
# src/content/config.ts
# -----------------------------
cat > src/content/config.ts <<'TS'
import { defineCollection, z } from 'astro:content'

const subjects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    description: z.string().optional()
  })
})

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subject: z.string(),
    code: z.string(),
    order: z.number().default(0),
    description: z.string().optional()
  })
})

const concepts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    subject: z.string(),
    course: z.string().optional(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([])
  })
})

export const collections = { subjects, courses, concepts }
TS

# -----------------------------
# src/layouts/DocsLayout.astro
# -----------------------------
cat > src/layouts/DocsLayout.astro <<'ASTRO'
---
import Sidebar from "../components/Sidebar.astro"
import Breadcrumbs from "../components/Breadcrumbs.astro"
const { title = "", description = "" } = Astro.props
import "../styles/global.css"
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title ? `${title} — your-site` : 'your-site'}</title>
    <meta name="description" content={description} />
  </head>
  <body class="min-h-screen bg-white text-gray-900">
    <div class="flex">
      <aside class="hidden md:block sticky top-0 h-screen border-r w-[var(--sidebar-w)] p-4">
        <a href="/" class="font-bold text-lg block mb-4">your-site</a>
        <Sidebar />
      </aside>
      <main class="flex-1 min-w-0">
        <div class="md:hidden border-b p-3 flex gap-2 items-center sticky top-0 bg-white/80 backdrop-blur">
          <a href="/" class="font-semibold">your-site</a>
        </div>
        <div class="max-w-3xl mx-auto px-6 py-8">
          <Breadcrumbs />
          <slot />
        </div>
      </main>
    </div>
  </body>
</html>
ASTRO

# -----------------------------
# src/components/Sidebar.astro
# -----------------------------
cat > src/components/Sidebar.astro <<'ASTRO'
---
import { getCollection } from 'astro:content'
const subjects = (await getCollection('subjects')).toSorted((a,b)=>a.data.order-b.data.order)
const courses = (await getCollection('courses')).toSorted((a,b)=>a.data.order-b.data.order)
const concepts = (await getCollection('concepts')).toSorted((a,b)=>a.data.order-b.data.order)
---
<nav class="space-y-6">
  <div>
    <h2 class="text-xs uppercase tracking-wide text-gray-500 mb-2">Subjects</h2>
    <ul class="space-y-1">
      {subjects.map(s => (
        <li><a class={`sidebar-link ${Astro.url.pathname.startsWith(`/subjects/${s.slug}`)?'active':''}`} href={`/subjects/${s.slug}/`}>{s.data.title}</a></li>
      ))}
    </ul>
  </div>
  <div>
    <h2 class="text-xs uppercase tracking-wide text-gray-500 mb-2">Courses</h2>
    <ul class="space-y-1">
      {courses.map(c => (
        <li><a class={`sidebar-link ${Astro.url.pathname.startsWith(`/courses/${c.slug}`)?'active':''}`} href={`/courses/${c.slug}/`}>{c.data.code} — {c.data.title}</a></li>
      ))}
    </ul>
  </div>
  <div>
    <h2 class="text-xs uppercase tracking-wide text-gray-500 mb-2">Concepts</h2>
    <ul class="space-y-1">
      {concepts.map(x => (
        <li><a class={`sidebar-link ${Astro.url.pathname.includes(`/concepts/${x.slug}`)?'active':''}`} href={`/concepts/${x.slug}/`}>{x.data.title}</a></li>
      ))}
    </ul>
  </div>
</nav>
ASTRO

# -----------------------------
# src/components/Breadcrumbs.astro
# -----------------------------
cat > src/components/Breadcrumbs.astro <<'ASTRO'
---
import { getCollection } from 'astro:content'
const parts = Astro.url.pathname.replace(/\/$/, '').split('/').filter(Boolean)

const lookup = async (segment: string) => {
  // try subjects, courses, concepts in that order
  const [s,c,k] = await Promise.all([
    getCollection('subjects').then(list=>list.find(x=>x.slug===segment)),
    getCollection('courses').then(list=>list.find(x=>x.slug===segment)),
    getCollection('concepts').then(list=>list.find(x=>x.slug===segment)),
  ])
  return s?.data.title || c?.data.title || k?.data.title || segment
}

const items = await Promise.all(parts.map(async (_,i)=>{
  const href = '/' + parts.slice(0, i+1).join('/') + '/'
  const label = await lookup(parts[i])
  return { href, label }
}))
---
{items.length > 0 && (
  <nav aria-label="Breadcrumbs" class="text-sm mb-6 text-gray-600">
    <ol class="flex items-center gap-1 flex-wrap">
      <li><a href="/" class="hover:underline">Home</a></li>
      {items.map((it,idx)=> (
        <li class="flex items-center gap-1" aria-current={idx===items.length-1? 'page': undefined}>
          <span>›</span>
          {idx===items.length-1 ? (
            <span class="font-medium text-gray-800">{it.label}</span>
          ) : (
            <a href={it.href} class="hover:underline">{it.label}</a>
          )}
        </li>
      ))}
    </ol>
  </nav>
)}
ASTRO

# -----------------------------
# src/pages/index.astro
# -----------------------------
cat > src/pages/index.astro <<'ASTRO'
---
import DocsLayout from "../layouts/DocsLayout.astro"
import { getCollection } from 'astro:content'
const subjects = (await getCollection('subjects')).toSorted((a,b)=>a.data.order-b.data.order)
const courses = (await getCollection('courses')).toSorted((a,b)=>a.data.order-b.data.order)
---
<DocsLayout title="Welcome">
  <h1 class="text-3xl font-bold mb-4">Welcome to your-site</h1>
  <p class="text-gray-700 mb-8">A learning site scaffold with subjects, courses, and concepts.</p>
  <div class="grid md:grid-cols-2 gap-6">
    <section class="p-5 border rounded-2xl">
      <h2 class="text-lg font-semibold mb-3">Subjects</h2>
      <ul class="list-disc ms-5">
        {subjects.map(s => <li><a class="underline" href={`/subjects/${s.slug}/`}>{s.data.title}</a></li>)}
      </ul>
    </section>
    <section class="p-5 border rounded-2xl">
      <h2 class="text-lg font-semibold mb-3">Courses</h2>
      <ul class="list-disc ms-5">
        {courses.map(c => <li><a class="underline" href={`/courses/${c.slug}/`}>{c.data.code} — {c.data.title}</a></li>)}
      </ul>
    </section>
  </div>
</DocsLayout>
ASTRO

# -----------------------------
# src/pages/subjects/[slug]/index.astro
# -----------------------------
cat > src/pages/subjects/[slug]/index.astro <<'ASTRO'
---
import DocsLayout from "../../../layouts/DocsLayout.astro"
import { getCollection } from 'astro:content'
const { slug } = Astro.params
const subject = (await getCollection('subjects')).find(s=>s.slug===slug)
if (!subject) throw new Error('Subject not found')
const courses = (await getCollection('courses')).filter(c=>c.data.subject===subject.slug).toSorted((a,b)=>a.data.order-b.data.order)
const concepts = (await getCollection('concepts')).filter(k=>k.data.subject===subject.slug).toSorted((a,b)=>a.data.order-b.data.order)
---
<DocsLayout title={subject.data.title} description={subject.data.description}>
  <h1 class="text-2xl font-bold mb-2">{subject.data.title}</h1>
  {subject.data.description && <p class="text-gray-700 mb-6">{subject.data.description}</p>}
  <h2 class="text-lg font-semibold mt-8 mb-3">Courses</h2>
  <ul class="list-disc ms-5">
    {courses.map(c => <li><a class="underline" href={`/courses/${c.slug}/`}>{c.data.code} — {c.data.title}</a></li>)}
  </ul>
  <h2 class="text-lg font-semibold mt-8 mb-3">Concepts</h2>
  <ul class="list-disc ms-5">
    {concepts.map(k => <li><a class="underline" href={`/concepts/${k.slug}/`}>{k.data.title}</a></li>)}
  </ul>
</DocsLayout>
ASTRO

# -----------------------------
# src/pages/courses/[slug]/index.astro
# -----------------------------
cat > src/pages/courses/[slug]/index.astro <<'ASTRO'
---
import DocsLayout from "../../../layouts/DocsLayout.astro"
import { getCollection } from 'astro:content'
const { slug } = Astro.params
const course = (await getCollection('courses')).find(c=>c.slug===slug)
if (!course) throw new Error('Course not found')
const concepts = (await getCollection('concepts')).filter(k=>k.data.course===course.slug).toSorted((a,b)=>a.data.order-b.data.order)
---
<DocsLayout title={course.data.title} description={course.data.description}>
  <h1 class="text-2xl font-bold mb-2">{course.data.code} — {course.data.title}</h1>
  {course.data.description && <p class="text-gray-700 mb-6">{course.data.description}</p>}
  <h2 class="text-lg font-semibold mt-8 mb-3">Concepts in this course</h2>
  <ul class="list-disc ms-5">
    {concepts.map(k => <li><a class="underline" href={`/concepts/${k.slug}/`}>{k.data.title}</a></li>)}
  </ul>
</DocsLayout>
ASTRO

# -----------------------------
# src/pages/concepts/[slug]/index.astro
# -----------------------------
cat > src/pages/concepts/[slug]/index.astro <<'ASTRO'
---
import DocsLayout from "../../../layouts/DocsLayout.astro"
import { getEntry } from 'astro:content'
const { slug } = Astro.params
const entry = await getEntry('concepts', slug)
if (!entry) throw new Error('Concept not found')
const { Content, data } = await entry.render()
---
<DocsLayout title={data.title} description={data.summary}>
  <article class="prose">
    <h1>{data.title}</h1>
    <Content />
  </article>
</DocsLayout>
ASTRO

# -----------------------------
# Example content
# -----------------------------
cat > src/content/subjects/mathematics.md <<'MD'
---
title: Mathematics
order: 1
description: Foundations through advanced topics across algebra, analysis, geometry, and more.
---
MD

cat > src/content/courses/math-101.md <<'MD'
---
subject: mathematics
code: MATH-101
title: Calculus I
order: 1
description: Limits, derivatives, applications, and intro to integrals.
---
MD

cat > src/content/concepts/limits.md <<'MD'
---
subject: mathematics
course: math-101
title: Limits
order: 1
summary: Intuition and formal ε–δ definition of limits.
tags: [calculus, foundations]
---
A **limit** describes the value a function approaches as the input approaches some point. …
MD

echo "==> Installing dependencies…"
npm i
npm i -D @astrojs/tailwind tailwindcss @astrojs/mdx zod

echo "==> All set. Start the dev server with:"
echo "    npm run dev"
