import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export const lifecycleStatuses = ['draft', 'refine', 'stable']
const validIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'src', 'content')
const collections = [
  'subjects',
  'macro-courses',
  'courses',
  'lessons',
  'concepts',
  'exercises',
  'notes',
]

async function listContentFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await listContentFiles(fullPath)
      files.push(...nested)
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

export async function loadCollection(collectionName) {
  if (!collections.includes(collectionName)) {
    throw new Error(`Unknown collection ${collectionName}`)
  }
  const dir = path.join(contentDir, collectionName)
  const files = await listContentFiles(dir)
  const entries = []
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8')
    const parsed = matter(raw)
    const slug = path.basename(file).replace(/\.(md|mdx)$/i, '')
    const data = { ...parsed.data }
    const id = data.id ?? slug
    if (!data.status) {
      data.status = 'draft'
    }
    entries.push({
      id,
      data: { ...data, id },
      body: parsed.content,
      filePath: path.relative(rootDir, file),
      slug,
    })
  }
  return entries
}

export async function loadAllContent() {
  const loaded = await Promise.all(collections.map((name) => loadCollection(name)))
  return Object.fromEntries(
    collections.map((name, idx) => [name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), loaded[idx]]),
  )
}

export function indexById(entries) {
  const map = new Map()
  const duplicates = []
  for (const entry of entries) {
    if (map.has(entry.id)) {
      duplicates.push(entry)
    } else {
      map.set(entry.id, entry)
    }
  }
  return { map, duplicates }
}

export function validateIdFormat(id, collection, errors, filePath) {
  if (!validIdPattern.test(id)) {
    errors.push(`${collection}: ${id} in ${filePath} is not lowercase-hyphen format`)
  }
}
