import { getCollection, type CollectionEntry } from 'astro:content'
import { collectionNames } from './collections'

type CourseEntry = CollectionEntry<'courses'>
type ConceptEntry = CollectionEntry<'concepts'>

export type TagGroups = {
  tag: string
  courses: CourseEntry[]
  concepts: ConceptEntry[]
}

type Bucket = {
  courses: CourseEntry[]
  concepts: ConceptEntry[]
}

const ensureBucket = (map: Map<string, Bucket>, tag: string): Bucket => {
  if (!map.has(tag)) {
    map.set(tag, { courses: [], concepts: [] })
  }

  return map.get(tag) as Bucket
}

const extractTags = (entry: CourseEntry | ConceptEntry): string[] => {
  const candidate = (entry.data as { tags?: string[] }).tags
  return Array.isArray(candidate) ? candidate : []
}

export const getAllTags = async (): Promise<TagGroups[]> => {
  const [courses, concepts] = await Promise.all([
    getCollection(collectionNames.courses),
    getCollection(collectionNames.concepts),
  ])

  const tagMap = new Map<string, Bucket>()

  for (const course of courses) {
    for (const tag of extractTags(course)) {
      ensureBucket(tagMap, tag).courses.push(course)
import { getCollection } from 'astro:content'
import { collectionNames } from './collections'

type TagUsageType = 'courses' | 'concepts'

type TagUsageCounts = Record<TagUsageType, number>

export type TagSummary = {
  name: string
  courses: number
  concepts: number
  total: number
}

const ensureEntry = (map: Map<string, TagUsageCounts>, tag: string) => {
  const existing = map.get(tag)
  if (existing) return existing
  const initial: TagUsageCounts = { courses: 0, concepts: 0 }
  map.set(tag, initial)
  return initial
}

const recordTags = (map: Map<string, TagUsageCounts>, tags: string[] = [], type: TagUsageType) => {
  for (const tag of tags) {
    const normalized = tag.trim()
    if (!normalized) continue
    const entry = ensureEntry(map, normalized)
    entry[type] += 1
  }
}

export async function getAllTags(): Promise<TagSummary[]> {
  const [courses, concepts] = await Promise.all([
    getCollection(collectionNames.courses),
    getCollection(collectionNames.concepts)
  ])

  const counts = new Map<string, TagUsageCounts>()

  for (const course of courses) {
    if ('tags' in course.data && Array.isArray(course.data.tags)) {
      recordTags(counts, course.data.tags, 'courses')
    }
  }

  for (const concept of concepts) {
    for (const tag of extractTags(concept)) {
      ensureBucket(tagMap, tag).concepts.push(concept)
    }
  }

  return Array.from(tagMap.entries()).map(([tag, groups]) => ({
    tag,
    courses: groups.courses,
    concepts: groups.concepts,
  }))
    recordTags(counts, concept.data.tags, 'concepts')
  }

  return Array.from(counts.entries())
    .map(([name, usage]) => ({
      name,
      courses: usage.courses,
      concepts: usage.concepts,
      total: usage.courses + usage.concepts
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
