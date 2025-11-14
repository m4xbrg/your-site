---
title: Variables & Types
description: Names that store values; primitive types and how to pick them.
subject: computer-science
course: cs-101
order: 1
tags: [basics, types]
lessons: []
relatedConcepts: []
---
Variables let you associate a name with a value. Most languages give you a few primitive types (numbers, strings, booleans) and composite types (arrays/lists, objects/maps).

## Examples

Here's a quick JavaScript snippet that demonstrates how different primitive types can be declared and initialized:

```js
let count = 3; // number
const greeting = "Hello"; // string
let isActive = count > 0; // boolean derived from a comparison
let scores = [count, 10, 42]; // array of numbers
const user = { name: greeting, logins: count }; // object/map
```

Each variable name now represents a concrete value. Choosing `const` or `let` communicates whether the binding should be reassigned, and the type hints at how the value is meant to be used.

## Exercises

1. **Prompt:** Declare three variables—`city` (string), `population` (number), and `isCapital` (boolean)—and set them to values that make sense together. Explain in a comment why you picked each type.
   **Hint:** Think about the kind of data each name suggests: text for `city`, a count for `population`, and a yes/no flag for `isCapital`.
   **Solution:**

   ```js
   const city = "Madrid"; // strings hold text labels
   let population = 3_300_000; // numbers store measurable quantities
   const isCapital = true; // booleans answer yes/no questions
   ```
