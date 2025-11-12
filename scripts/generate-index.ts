import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

type Frontmatter = Record<string, any>

type SearchDocument = {
  id: string
  collection: string
  slug: string
  title: string
  description?: string
  url: string
  data: Frontmatter
  content: string
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const contentRoot = path.join(repoRoot, 'src', 'content')
const outputFile = path.join(repoRoot, 'public', 'search-index.json')

const IGNORED_DIRECTORIES = new Set(['config', 'config.ts', 'templates'])
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx'])

async function main() {
  const collections = await discoverCollections(contentRoot)
  const documents: SearchDocument[] = []

  for (const collection of collections) {
    const collectionDir = path.join(contentRoot, collection)
    const files = await collectMarkdownFiles(collectionDir)

    for (const file of files) {
      const absolutePath = path.join(collectionDir, file)
      const raw = await fs.readFile(absolutePath, 'utf8')
      const parsed = matter(raw)
      const frontmatter = parsed.data as Frontmatter

      if (!isPublished(frontmatter)) continue

      const slug = toSlug(file)
      const title = inferTitle(frontmatter, slug)
      const description = inferDescription(frontmatter)
      const url = buildUrl(collection, slug, frontmatter)
      const content = sanitizeContent(parsed.content)

      documents.push({
        id: `${collection}:${slug}`,
        collection,
        slug,
        title,
        description,
        url,
        data: frontmatter,
        content
      })
    }
  }

  documents.sort((a, b) => a.slug.localeCompare(b.slug))

  await fs.mkdir(path.dirname(outputFile), { recursive: true })
  await fs.writeFile(outputFile, JSON.stringify(documents, null, 2), 'utf8')

  console.log(`Wrote ${documents.length} documents to ${path.relative(repoRoot, outputFile)}`)
}

async function discoverCollections(root: string): Promise<string[]> {
  const entries = await fs.readdir(root, { withFileTypes: true })
  const collections: string[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (IGNORED_DIRECTORIES.has(entry.name)) continue

    const hasMarkdown = await directoryHasMarkdown(path.join(root, entry.name))
    if (!hasMarkdown) continue

    collections.push(entry.name)
  }

  return collections
}

async function directoryHasMarkdown(dir: string): Promise<boolean> {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (await directoryHasMarkdown(path.join(dir, entry.name))) {
        return true
      }
      continue
    }

    if (MARKDOWN_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      return true
    }
  }

  return false
}

async function collectMarkdownFiles(dir: string, prefix = ''): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const nested = await collectMarkdownFiles(path.join(dir, entry.name), path.posix.join(prefix, entry.name))
      files.push(...nested)
      continue
    }

    const ext = path.extname(entry.name).toLowerCase()
    if (!MARKDOWN_EXTENSIONS.has(ext)) continue

    const relativePath = path.posix.join(prefix, entry.name)
    files.push(relativePath)
  }

  return files
}

function toSlug(filePath: string): string {
  const withoutExt = filePath.replace(/\.(md|mdx)$/i, '')
  return withoutExt.replace(/\\/g, '/').replace(/index$/i, '').replace(/\/$/, '') || 'index'
}

function inferTitle(frontmatter: Frontmatter, slug: string): string {
  if (typeof frontmatter.title === 'string' && frontmatter.title.trim().length > 0) {
    return frontmatter.title.trim()
  }

  const segments = slug.split('/').filter(Boolean)
  const last = segments[segments.length - 1] ?? slug
  return last
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function inferDescription(frontmatter: Frontmatter): string | undefined {
  const { description, summary, prompt } = frontmatter

  if (typeof description === 'string' && description.trim()) {
    return description.trim()
  }

  if (typeof summary === 'string' && summary.trim()) {
    return summary.trim()
  }

  if (typeof prompt === 'string' && prompt.trim()) {
    return prompt.trim()
  }

  return undefined
}

function buildUrl(collection: string, slug: string, frontmatter: Frontmatter): string {
  const normalizedSlug = slug.replace(/\\/g, '/').replace(/(^\/|\/$)/g, '')

  switch (collection) {
    case 'courses': {
      const id = typeof frontmatter.id === 'string' && frontmatter.id.trim() ? frontmatter.id.trim() : normalizedSlug
      return `/courses/${id}/`
    }
    case 'subjects':
      return `/subjects/${normalizedSlug}/`
    case 'concepts':
      return `/concepts/${normalizedSlug}/`
    case 'lessons':
      return `/lessons/${normalizedSlug}/`
    case 'exercises':
      return `/exercises/${normalizedSlug}/`
    case 'notes':
      return `/notes/${normalizedSlug}/`
    default:
      return `/${collection}/${normalizedSlug}/`
  }
}

function sanitizeContent(content: string): string {
  return content.replace(/\r\n/g, '\n').trim()
}

function isPublished(frontmatter: Frontmatter): boolean {
  if (!frontmatter) return true

  if (frontmatter.draft === true) {
    return false
  }

  if (typeof frontmatter.published === 'boolean') {
    return frontmatter.published
  }

  if (typeof frontmatter.status === 'string') {
    const status = frontmatter.status.toLowerCase()
    if (['draft', 'unpublished', 'private', 'archived'].includes(status)) {
      return false
    }
  }

  return true
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
