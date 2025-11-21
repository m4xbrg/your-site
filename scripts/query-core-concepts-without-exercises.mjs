import { loadAllContent } from './lib/content-utils.mjs'

async function main() {
  const { concepts, exercises } = await loadAllContent()
  const exerciseConcepts = new Set()
  for (const exercise of exercises) {
    for (const conceptId of exercise.data.concepts ?? []) {
      exerciseConcepts.add(conceptId)
    }
  }

  const filtered = concepts.filter(
    (concept) =>
      concept.data.subject === 'mathematics' &&
      concept.data.macroId === 'math-calculus' &&
      concept.data.role === 'core',
  )

  const missing = filtered.filter((concept) => !exerciseConcepts.has(concept.id))

  console.log('Core calculus concepts without linked exercises:')
  if (missing.length === 0) {
    console.log('- None 🎉')
    return
  }

  for (const concept of missing) {
    console.log(`- ${concept.id} :: ${concept.data.title}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
