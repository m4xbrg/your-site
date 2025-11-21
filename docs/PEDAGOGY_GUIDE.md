# Pedagogy Guide

Pedagogy is a **layer on top of the knowledge graph**.  
It expresses *how learners move through concepts*, not what the concepts are.

This document describes how to design lessons, exercises, and notes.

---

# 1. Lessons

A lesson is a **teaching sequence** built from a set of concept IDs.

## 1.1 Required Metadata
- `id`
- `subject`, `macroId`, `courseId`
- `order`
- `title`
- `status`
- `concepts: string[]`

## 1.2 Lesson Structure
A recommended template:

1. **Setup / Motivation**  
2. **Objectives**  
3. **Concept Recap** (links to concept pages; do not redefine them)  
4. **Exposition**  
5. **Worked Examples**  
6. **Mid-Lesson Checks**  
7. **Summary of Key Moves**  
8. **Next Steps** (exercises or related concepts)

Lessons form a *pedagogical path*, not a conceptual dependency graph.

---

# 2. Exercises

Exercises evaluate understanding of concepts.

## 2.1 Required Metadata
- `id`
- `subject`, `macroId`, `courseId`
- `lessonId` (optional for mixed review)
- `concepts: string[]`
- `status`
- difficulty (optional per exercise or per file)

## 2.2 Exercise Set Structure
A balanced set should include:
- procedural problems  
- intermediate problems  
- conceptual reasoning  
- edge-case or transfer problems  

Solutions should be:
- concise  
- stepwise  
- concept-anchored  

---

# 3. Notes

Notes support:
- authoring  
- course design  
- pedagogy explanation  
- metadata tracking  
- cross-subject commentary  

Notes never appear in the knowledge graph.  
They support humans, not learners directly.

---

# 4. Multiple Pedagogical Paths

The pedagogy layer should support:
- standard sequences  
- honors or accelerated tracks  
- diagnostic learning  
- competency-based progression  
- concept-first browsing  
- skill-focused modules  

All of these reuse the same concept graph.

---

# 5. Separation of Concerns

- Lessons/exercises can change without altering concepts.  
- Concepts remain stable and pedagogically neutral.  
- Notes document the decisions behind pedagogy.  
- Courses/macro-courses provide structure but not narrative.

This ensures the system can scale to any subject or audience.
