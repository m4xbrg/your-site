# Knowledge Model

This document defines the core architecture of the content graph.  
The system is intentionally split into two layers:

1. **Knowledge Layer** — the ontology of ideas  
2. **Pedagogy Layer** — the structures used to teach those ideas

This separation ensures that knowledge remains stable and reusable across subjects, while lessons and exercises remain flexible, audience-specific, and pedagogically expressive.

---

# 1. Knowledge Layer

The knowledge layer represents **conceptual truth**: the ideas that exist independent of teaching method, curriculum order, or audience.  
Its nodes form a reusable, domain-agnostic graph.

## 1.1 Entities

### **Subject**
A large domain of knowledge (e.g., mathematics, physics, history, computer science).  
Subjects exist to group macro-courses and to allow multi-domain scaling.

### **Macro-Course**
A *territory* inside a subject — a broad conceptual area.  
Examples:  
- In mathematics: calculus, algebra, discrete math  
- In physics: mechanics, electromagnetism, quantum  
- In CS: algorithms, systems, AI  

A macro-course is not pedagogical; it is a container for a coherent conceptual region.

### **Course**
A structured bundle of related concepts.  
A course approximates the “unit of knowledge” traditionally taught as a class, but is defined conceptually, not by lessons.

Courses describe:
- high-level learning goals  
- conceptual boundaries  
- relationships to other courses  

### **Concept**
The atomic unit of the knowledge graph.  
A concept represents a mathematical idea, historical fact, physical law, definition, skill, theorem, interpretation, principle, or technique.

A good concept:
- is pedagogically neutral  
- has prerequisites and related concepts  
- has learning goals that describe what understanding *means*  
- exists independent of ordering or lesson structure  

Concepts are the most important entity in the system.

## 1.2 Knowledge-Layer Relationships

- **subject → macro-course → course → concept** describes location, not sequence.
- **prerequisites** define conceptual dependency.
- **relatedConcepts** define lateral similarity or conceptual neighborhoods.
- **tags**, **role**, **difficulty**, and **kind** enrich the semantics of the concept graph.

The knowledge layer must remain:
- acyclic at the prerequisites level  
- domain-agnostic  
- independent of pedagogy  

---

# 2. Pedagogy Layer

The pedagogy layer expresses *how a human might learn* the concepts.  
It is intentionally modular and replaceable.

## 2.1 Entities

### **Lesson**
A structured teaching sequence over a subset of concepts.  
Lessons reference concepts via IDs and may include:
- objectives  
- explanations  
- examples  
- visualizations  
- narrative flow  

A lesson is one **view** over the concept graph.

### **Exercise**
A set of problems tied to specific concepts.  
Exercises provide:
- procedural practice  
- conceptual reasoning  
- diagnostics  
- skill assessment  

Exercises always reference concept IDs to enable coverage tracking.

### **Note**
A flexible pedagogical or meta layer:
- authoring guidelines  
- course design notes  
- reflective commentary  
- explanations of how/why lessons are structured  

Notes help maintain the system but do not belong to the knowledge graph itself.

---

# 3. Relationship Between Layers

- Concepts are **knowledge**.  
- Lessons/exercises/notes are **pedagogy**.  
- Courses/macro-courses/subjects organize the concept graph into areas.  

Knowledge remains stable.  
Pedagogy remains flexible, audience-dependent, and replaceable.

This architecture allows the system to scale from mathematics to *all human knowledge*.
