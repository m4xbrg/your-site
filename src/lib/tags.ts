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
}
