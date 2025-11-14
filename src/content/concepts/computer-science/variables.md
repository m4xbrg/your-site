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

Here's a short TypeScript snippet that demonstrates declaring constants and mutable variables, plus how type inference kicks in.

```ts
const siteName = "YourSite"; // inferred as string and can't be reassigned
let visitorsToday = 120;      // inferred as number and can change later

function logVisit(user: string) {
  visitorsToday += 1;
  console.log(`${user} visited ${siteName}. Total: ${visitorsToday}`);
}

logVisit("Aisha");
logVisit("Marco");
```

## Exercises

**Prompt:** Rewrite the snippet below so that the `total` variable never gets reassigned while still returning the same result.

```ts
let total = 0;
total = price + tax;
return total;
```

**Hint:** Think about how `const` works with expressions and whether you really need to mutate the variable.

**Solution:**

```ts
const total = price + tax;
return total;
```
