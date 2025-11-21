import { getCollection, type CollectionEntry } from 'astro:content';
import { collectionNames } from './collections';

export type TaggableCollectionName =
  | typeof collectionNames.courses
  | typeof collectionNames.concepts
  | typeof collectionNames.lessons
  | typeof collectionNames.exercises;

type TaggableEntry = CollectionEntry<TaggableCollectionName>;

export type TaggedEntrySummary = {
  slug: string;
  title: string;
  collection: TaggableCollectionName;
  data: TaggableEntry['data'];
};

export type TagGroup = {
  tag: string;
  entries: TaggedEntrySummary[];
};

const getEntryTags = (entry: TaggableEntry): string[] => {
  const tags = (entry.data as { tags?: string[] }).tags;
  return Array.isArray(tags) ? tags : [];
};

const appendEntriesForCollection = (
  tagMap: Map<string, TaggedEntrySummary[]>,
  collectionName: TaggableCollectionName,
  entries: TaggableEntry[]
) => {
  for (const entry of entries) {
    const tags = getEntryTags(entry);

    for (const tag of tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }

      tagMap.get(tag)!.push({
        slug: entry.slug,
        title: entry.data.title,
        collection: collectionName,
        data: entry.data,
      });
    }
  }
};

export const getAllTags = async (): Promise<TagGroup[]> => {
  const [courses, concepts, lessons, exercises] = await Promise.all([
    getCollection(collectionNames.courses),
    getCollection(collectionNames.concepts),
    getCollection(collectionNames.lessons),
    getCollection(collectionNames.exercises),
  ]);

  const tagMap = new Map<string, TaggedEntrySummary[]>();

  appendEntriesForCollection(tagMap, collectionNames.courses, courses as TaggableEntry[]);
  appendEntriesForCollection(tagMap, collectionNames.concepts, concepts as TaggableEntry[]);
  appendEntriesForCollection(tagMap, collectionNames.lessons, lessons as TaggableEntry[]);
  appendEntriesForCollection(tagMap, collectionNames.exercises, exercises as TaggableEntry[]);

  return Array.from(tagMap.entries())
    .sort(([tagA], [tagB]) => tagA.localeCompare(tagB))
    .map(([tag, entries]) => ({
      tag,
      entries,
    }));
};
