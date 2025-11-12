import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

type ContentType = 'concept' | 'lesson' | 'exercise' | 'note' | 'course'

type BuildParams = {
  title: string
  slug: string
  subjectInput: string
  subjectSlug: string
}

type ContentConfig = {
  directory: string
  extension: string
  groupBySubject?: boolean
  build: (params: BuildParams) => string
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const contentRoot = path.join(rootDir, 'src', 'content')

const typeConfigs: Record<ContentType, ContentConfig> = {
  concept: {
    directory: path.join(contentRoot, 'concepts'),
    extension: '.mdx',
    groupBySubject: true,
    build: ({ title, subjectSlug }) => {
      return [
        '---',
        `title: ${JSON.stringify(title)}`,
        'description: "TODO: add a brief summary."',
        `subject: ${JSON.stringify(subjectSlug)}`,
        'order: 0',
        'tags: []',
        'lessons: []',
        'relatedConcepts: []',
        '---',
        '',
        `Write about ${title} here.`,
        ''
      ].join('\n')
    }
  },
  lesson: {
    directory: path.join(contentRoot, 'lessons'),
    extension: '.mdx',
    groupBySubject: true,
    build: ({ title, subjectSlug, slug }) => {
      return [
        '---',
        `title: ${JSON.stringify(title)}`,
        'description: "TODO: describe the lesson."',
        'course: ""',
        `concept: ${JSON.stringify(`${subjectSlug}/${slug}`)}`,
        'order: 0',
        'durationMinutes: 0',
        'objectives: []',
        'exercises: []',
        'notes: []',
        '---',
        '',
        `Introduce the lesson "${title}" here.`,
        ''
      ].join('\n')
    }
  },
  exercise: {
    directory: path.join(contentRoot, 'exercises'),
    extension: '.mdx',
    groupBySubject: true,
    build: ({ title, subjectSlug, slug }) => {
      return [
        '---',
        `title: ${JSON.stringify(title)}`,
        'prompt: ""',
        `lesson: ${JSON.stringify(`${subjectSlug}/${slug}`)}`,
        'concept: ""',
        'course: ""',
        'difficulty: beginner',
        'order: 0',
        'topics: []',
        'solution: |',
        '  TODO: add the solution steps.',
        '---',
        '',
        `Write the exercise content for ${title} here.`,
        ''
      ].join('\n')
    }
  },
  note: {
    directory: path.join(contentRoot, 'notes'),
    extension: '.mdx',
    groupBySubject: true,
    build: ({ title }) => {
      return [
        '---',
        `title: ${JSON.stringify(title)}`,
        'summary: ""',
        'course: ""',
        'concept: ""',
        'lesson: ""',
        'order: 0',
        'tags: []',
        '---',
        '',
        `Capture notes for ${title} here.`,
        ''
      ].join('\n')
    }
  },
  course: {
    directory: path.join(contentRoot, 'courses'),
    extension: '.mdx',
    build: ({ title, subjectSlug }) => {
      return [
        '---',
        `title: ${JSON.stringify(title)}`,
        'description: ""',
        `subject: ${JSON.stringify(subjectSlug)}`,
        'code: ""',
        'order: 0',
        'concepts: []',
        'lessons: []',
        'prerequisites: []',
        '---',
        '',
        `Outline the course "${title}" here.`,
        ''
      ].join('\n')
    }
  }
}

function slugify(input: string): string {
  const normalized = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
  return normalized.length > 0 ? normalized : 'untitled'
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true })
}

function printUsage() {
  console.log('Usage: pnpm tsx tools/generate-page.ts <type> <subject> <title...>')
  console.log('Supported types: concept, lesson, exercise, note, course')
}

async function main() {
  const [typeArg, subjectArg, ...titleParts] = process.argv.slice(2)

  if (!typeArg || !subjectArg || titleParts.length === 0) {
    printUsage()
    process.exit(1)
  }

  const type = typeArg.toLowerCase() as ContentType
  if (!Object.prototype.hasOwnProperty.call(typeConfigs, type)) {
    console.error(`Unknown type: ${typeArg}`)
    printUsage()
    process.exit(1)
  }

  const title = titleParts.join(' ').trim()
  if (!title) {
    console.error('Title cannot be empty.')
    process.exit(1)
  }

  const subjectInput = subjectArg.trim()
  if (!subjectInput) {
    console.error('Subject cannot be empty.')
    process.exit(1)
  }

  const subjectSlug = slugify(subjectInput)
  const slug = slugify(title)
  const config = typeConfigs[type]

  const baseDir = config.groupBySubject
    ? path.join(config.directory, subjectSlug)
    : config.directory

  await ensureDir(baseDir)

  const filePath = path.join(baseDir, `${slug}${config.extension}`)

  try {
    await fs.access(filePath)
    console.error(`File already exists: ${path.relative(rootDir, filePath)}`)
    process.exit(1)
  } catch {
    // File does not exist; continue
  }

  const content = config.build({
    title,
    slug,
    subjectInput,
    subjectSlug
  })

  await fs.writeFile(filePath, content, 'utf8')
  console.log(`Created ${type} at ${path.relative(rootDir, filePath)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
