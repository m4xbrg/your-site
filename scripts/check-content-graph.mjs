import { lifecycleStatuses, loadAllContent, indexById, validateIdFormat } from './lib/content-utils.mjs'

function assertStatus(value, collection, id, filePath, errors) {
  if (!lifecycleStatuses.includes(value)) {
    errors.push(`${collection}: ${id} in ${filePath} has invalid status ${value}`)
  }
}

function reportDuplicates(duplicates, collection, errors) {
  for (const dup of duplicates) {
    errors.push(`${collection}: duplicate id ${dup.id} at ${dup.filePath}`)
  }
}

function detectCycles(conceptsMap) {
  const cycles = []
  const visiting = new Set()
  const visited = new Set()

  function dfs(id, path = []) {
    if (visiting.has(id)) {
      const cycleStart = path.indexOf(id)
      cycles.push([...path.slice(cycleStart), id])
      return
    }
    if (visited.has(id)) return
    visiting.add(id)
    const concept = conceptsMap.get(id)
    const prereqs = concept?.data.prerequisites ?? []
    for (const next of prereqs) {
      if (conceptsMap.has(next)) {
        dfs(next, [...path, id])
      }
    }
    visiting.delete(id)
    visited.add(id)
  }

  for (const id of conceptsMap.keys()) {
    if (!visited.has(id)) {
      dfs(id, [])
    }
  }

  return cycles
}

function validateRelationships({
  subjects,
  macroCourses,
  courses,
  lessons,
  concepts,
  exercises,
}) {
  const errors = []

  const { map: subjectMap, duplicates: subjectDup } = indexById(subjects)
  const { map: macroMap, duplicates: macroDup } = indexById(macroCourses)
  const { map: courseMap, duplicates: courseDup } = indexById(courses)
  const { map: lessonMap, duplicates: lessonDup } = indexById(lessons)
  const { map: conceptMap, duplicates: conceptDup } = indexById(concepts)
  const { map: exerciseMap, duplicates: exerciseDup } = indexById(exercises)

  reportDuplicates(subjectDup, 'subjects', errors)
  reportDuplicates(macroDup, 'macro-courses', errors)
  reportDuplicates(courseDup, 'courses', errors)
  reportDuplicates(lessonDup, 'lessons', errors)
  reportDuplicates(conceptDup, 'concepts', errors)
  reportDuplicates(exerciseDup, 'exercises', errors)

  for (const entry of subjects) {
    validateIdFormat(entry.id, 'subject', errors, entry.filePath)
    assertStatus(entry.data.status, 'subject', entry.id, entry.filePath, errors)
  }

  for (const entry of macroCourses) {
    validateIdFormat(entry.id, 'macro-course', errors, entry.filePath)
    assertStatus(entry.data.status, 'macro-course', entry.id, entry.filePath, errors)
    if (!subjectMap.has(entry.data.subject)) {
      errors.push(`macro-course: ${entry.id} references missing subject ${entry.data.subject} (${entry.filePath})`)
    }
  }

  for (const entry of courses) {
    validateIdFormat(entry.id, 'course', errors, entry.filePath)
    assertStatus(entry.data.status, 'course', entry.id, entry.filePath, errors)
    if (!subjectMap.has(entry.data.subject)) {
      errors.push(`course: ${entry.id} references missing subject ${entry.data.subject} (${entry.filePath})`)
    }
    if (!entry.data.macroId) {
      errors.push(`course: ${entry.id} missing macroId (${entry.filePath})`)
    } else if (!macroMap.has(entry.data.macroId)) {
      errors.push(`course: ${entry.id} references missing macro ${entry.data.macroId} (${entry.filePath})`)
    }
  }

  for (const entry of concepts) {
    validateIdFormat(entry.id, 'concept', errors, entry.filePath)
    assertStatus(entry.data.status, 'concept', entry.id, entry.filePath, errors)
    if (!subjectMap.has(entry.data.subject)) {
      errors.push(`concept: ${entry.id} references missing subject ${entry.data.subject} (${entry.filePath})`)
    }
    if (entry.data.macroId && !macroMap.has(entry.data.macroId)) {
      errors.push(`concept: ${entry.id} references missing macro ${entry.data.macroId} (${entry.filePath})`)
    }
    if (entry.data.courseId && !courseMap.has(entry.data.courseId)) {
      errors.push(`concept: ${entry.id} references missing course ${entry.data.courseId} (${entry.filePath})`)
    }
    for (const prereq of entry.data.prerequisites ?? []) {
      if (!conceptMap.has(prereq)) {
        errors.push(`concept: ${entry.id} has missing prerequisite ${prereq} (${entry.filePath})`)
      }
    }
    for (const related of entry.data.relatedConcepts ?? []) {
      if (!conceptMap.has(related)) {
        errors.push(`concept: ${entry.id} has missing relatedConcept ${related} (${entry.filePath})`)
      }
    }
  }

  for (const entry of lessons) {
    validateIdFormat(entry.id, 'lesson', errors, entry.filePath)
    assertStatus(entry.data.status, 'lesson', entry.id, entry.filePath, errors)
    if (!entry.data.courseId || !courseMap.has(entry.data.courseId)) {
      errors.push(`lesson: ${entry.id} references missing course ${entry.data.courseId} (${entry.filePath})`)
    }
    if (entry.data.macroId && !macroMap.has(entry.data.macroId)) {
      errors.push(`lesson: ${entry.id} references missing macro ${entry.data.macroId} (${entry.filePath})`)
    }
    if (entry.data.subject && !subjectMap.has(entry.data.subject)) {
      errors.push(`lesson: ${entry.id} references missing subject ${entry.data.subject} (${entry.filePath})`)
    }
    for (const conceptId of entry.data.concepts ?? []) {
      if (!conceptMap.has(conceptId)) {
        errors.push(`lesson: ${entry.id} references missing concept ${conceptId} (${entry.filePath})`)
      }
    }
  }

  for (const entry of exercises) {
    validateIdFormat(entry.id, 'exercise', errors, entry.filePath)
    assertStatus(entry.data.status, 'exercise', entry.id, entry.filePath, errors)
    if (!lessonMap.has(entry.data.lessonId)) {
      errors.push(`exercise: ${entry.id} references missing lesson ${entry.data.lessonId} (${entry.filePath})`)
    }
    if (!courseMap.has(entry.data.courseId)) {
      errors.push(`exercise: ${entry.id} references missing course ${entry.data.courseId} (${entry.filePath})`)
    }
    if (!macroMap.has(entry.data.macroId)) {
      errors.push(`exercise: ${entry.id} references missing macro ${entry.data.macroId} (${entry.filePath})`)
    }
    if (!subjectMap.has(entry.data.subject)) {
      errors.push(`exercise: ${entry.id} references missing subject ${entry.data.subject} (${entry.filePath})`)
    }
    for (const conceptId of entry.data.concepts ?? []) {
      if (!conceptMap.has(conceptId)) {
        errors.push(`exercise: ${entry.id} references missing concept ${conceptId} (${entry.filePath})`)
      }
    }
  }

  const cycles = detectCycles(conceptMap)
  for (const cycle of cycles) {
    errors.push(`concept prerequisite cycle: ${cycle.join(' -> ')}`)
  }

  return { errors, summary: { subjectCount: subjects.length, macroCount: macroCourses.length, courseCount: courses.length, lessonCount: lessons.length, conceptCount: concepts.length, exerciseCount: exercises.length } }
}

async function main() {
  const loaded = await loadAllContent()
  const { errors, summary } = validateRelationships(loaded)

  console.log('Content summary:')
  console.log(`  Subjects: ${summary.subjectCount}`)
  console.log(`  Macro-courses: ${summary.macroCount}`)
  console.log(`  Courses: ${summary.courseCount}`)
  console.log(`  Lessons: ${summary.lessonCount}`)
  console.log(`  Concepts: ${summary.conceptCount}`)
  console.log(`  Exercises: ${summary.exerciseCount}`)

  if (errors.length > 0) {
    console.error('\nGraph validation errors:')
    for (const err of errors) {
      console.error(`- ${err}`)
    }
    process.exitCode = 1
  } else {
    console.log('\nGraph validation passed with no errors.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
