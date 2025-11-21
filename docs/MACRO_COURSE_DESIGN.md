# Macro-Course Design

A macro-course is a **conceptual territory** inside a subject.  
Its purpose is to define a coherent region of knowledge and provide structure for multiple courses, cross-concept dependencies, and future pedagogy.

---

# 1. Purpose of Macro-Courses

A macro-course exists to:
- group courses into meaningful conceptual families  
- provide a stable “territory boundary” inside a subject  
- clarify cross-course dependencies  
- support multi-scale knowledge organization  
- scaffold reusable pedagogical tracks  

Examples (Mathematics):
- Foundations  
- Algebra  
- Calculus  
- Real Analysis  
- Linear Algebra  
- Geometry  
- Discrete Mathematics  

Macro-courses are domain-agnostic: the same pattern applies to physics, chemistry, CS, history, etc.

---

# 2. Structure of a Macro-Course

A macro-course consists of:

### 2.1 Metadata
- `id`  
- `subject`  
- `title`  
- `description`  
- optional ordering inside the subject  

### 2.2 Courses
Each course inside a macro-course:
- defines a coherent conceptual topic  
- bundles a set of related concepts  
- defines high-level learning goals  

### 2.3 Concept Families
Macro-courses should define **concept families**, e.g.:

Calculus:
- local behavior & linearization  
- accumulation & integration  
- asymptotic behavior  
- convergence & infinite processes  
- multidimensional behavior  

These families organize how concepts relate across courses.

---

# 3. Dependencies & Graph Structure

Macro-courses form the **multi-level concept graph**:

- `math-foundations` → prerequisite for algebra, calculus, discrete math  
- `math-algebra` → prerequisite for calculus  
- `math-calculus` → prerequisite for real analysis, physics, differential equations  
- `math-linear-algebra` → prerequisite for machine learning, quantum mechanics  

Dependencies should be:

- explicit  
- documented  
- stable  
- consistent across subjects  

---

# 4. Pedagogical Views Over a Macro-Course

A macro-course can support multiple pedagogical flows:

- standard sequence  
- honors sequence  
- diagnostic micro-courses  
- topic-focused modules  
- skills-based learning paths  

These flows should be defined using lessons/exercises, not by altering concept relationships.

---

# 5. Design Principles

- Macro-courses define *regions of knowledge*, not curriculums.  
- Courses define *bundles of concepts*, not lesson sequences.  
- Concepts define *atomic ideas*, independent of presentation.  
- Lessons/exercises define *pedagogy*, not ontology.  
- Notes record *meta-structure*.  

This separation ensures clarity, scalability, and domain-independence.
