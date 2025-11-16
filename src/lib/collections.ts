export const collectionNames = {
  subjects: 'subjects',
  'macro-courses': 'macro-courses',
  courses: 'courses',
  concepts: 'concepts',
  lessons: 'lessons',
  exercises: 'exercises',
  notes: 'notes',
} as const;

export type CollectionName = typeof collectionNames[keyof typeof collectionNames];
