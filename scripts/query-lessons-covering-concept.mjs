import { loadAllContent } from './lib/content-utils.mjs'

function collectNeighbors(conceptId, conceptMap) {
  const neighbors = new Set()
  for (const [id, concept] of conceptMap.entries()) {
    const prereqs = concept.data.prerequisites ?? []
    const related = concept.data.relatedConcepts ?? []
    if (prereqs.includes(conceptId) || related.includes(conceptId)) {
      neighbors.add(id)
    }
  }
  return neighbors
}

async function main() {
  const targetId = process.argv[2]
  if (!targetId) {
    console.error('Usage: node scripts/query-lessons-covering-concept.mjs <concept-id>')
    process.exit(1)
  }

  const { lessons, concepts } = await loadAllContent()
  const conceptMap = new Map(concepts.map((c) => [c.id, c]))
  const targetConcept = conceptMap.get(targetId)
  if (!targetConcept) {
    console.error(`Unknown concept: ${targetId}`)
    process.exit(1)
  }

  const neighborConcepts = collectNeighbors(targetId, conceptMap)
  const directLessons = []
  const indirectLessons = []

  for (const lesson of lessons) {
    const lessonConcepts = lesson.data.concepts ?? []
    if (lessonConcepts.includes(targetId)) {
      directLessons.push(lesson)
      continue
    }
    const relatedHits = lessonConcepts.filter((id) => neighborConcepts.has(id))
    if (relatedHits.length > 0) {
      indirectLessons.push({ lesson, via: relatedHits })
    }
  }

  console.log(`Lessons covering ${targetId}`)
  console.log('\nDirect coverage:')
  if (directLessons.length === 0) {
    console.log('- none')
  } else {
    for (const lesson of directLessons) {
      console.log(`- ${lesson.id} :: ${lesson.data.title}`)
    }
  }

  console.log('\nIndirect coverage (prereqs/related concepts):')
  if (indirectLessons.length === 0) {
    console.log('- none')
  } else {
    for (const { lesson, via } of indirectLessons) {
      console.log(`- ${lesson.id} :: ${lesson.data.title} (via ${via.join(', ')})`)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
