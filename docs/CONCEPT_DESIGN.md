# Concept Design Guide

Concepts are the atomic units of the knowledge graph.  
Everything else—courses, lessons, exercises—is built on top of them.

This document defines how to design concepts consistently across subjects.

---

# 1. Definition

A concept is a **single idea** that a learner can understand, reason about, or apply independently.

Examples:
- mathematical definitions  
- theorems and techniques  
- physical laws  
- historical events  
- linguistic constructs  
- algorithms and data structures  
- philosophical distinctions  

Concepts are **not pedagogical**.  
They should avoid sequencing, scaffolding, or instructional tone.

---

# 2. Required Components

Every concept must include:

### 2.1 Metadata
- `id`
- `subject`
- `macroId`
- `courseId`
- `role` (`core`, `supporting`, `extension`)
- `status` (`draft`, `refine`, `stable`)
- `kind` (definition, theorem, law, technique, principle, skill, interpretation)
- `difficulty` (1–5 or intro/bridge/challenging)
- `prerequisites` (concept graph)
- `relatedConcepts` (optional semantic links)
- `learningGoals` (3–6 crisp outcomes)

### 2.2 Body Structure
Concept bodies should follow a consistent structure:

1. **Statement / Definition**  
2. **Intuition / Interpretation**  
3. **Variants / Subcases** (if applicable)  
4. **Connections** (how the concept is used)  
5. **Typical Errors / Misconceptions**  
6. **Micro-Checks** (2–4 quick checks with answers)

Everything else (examples, visuals, long exposition) should happen in lessons.

---

# 3. Design Principles

- Concepts are reusable across courses.  
- Concepts should be small and precise.  
- Concepts should remain independent of ordering.  
- Dependency graphs should remain acyclic.  
- Related concepts express *neighborhoods*, not prerequisites.  
- Concept text should avoid pedagogy.

---

# 4. Relationship Rules

- If A requires B for understanding, B is a **prerequisite**.  
- If A and B are similar or often used together, they are **relatedConcepts**.  
- If a concept belongs in multiple courses, the course assignment should reflect its primary location, and lessons may pull it from other courses.  
- Tags help thematic grouping but do not replace graph edges.

---

# 5. Scale to All Subjects

This design applies to:
- physics concepts (e.g., Newton’s 2nd law)  
- CS concepts (recursion, time complexity)  
- history concepts (causes of a revolution)  
- biology concepts (mitosis, natural selection)  
- language concepts (grammar constructs, phonological processes)

The concept layer is universal and domain-independent.
