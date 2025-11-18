#!/usr/bin/env node
import fs from "fs";
import path from "path";
import YAML from "yaml";

const repoRoot = process.cwd();

function resolve(...parts) {
  return path.join(repoRoot, ...parts);
}

function loadFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");

  // Normalize Windows CRLF to LF so the regex works everywhere
  const normalized = raw.replace(/\r\n/g, "\n");

  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(normalized);
  if (!match) {
    throw new Error(`No frontmatter found in ${filePath}`);
  }
  const [, yamlText, body] = match;
  const data = YAML.parse(yamlText) || {};

  return { data, body };
}


function saveFrontmatter(filePath, data, body) {
  const yamlText = YAML.stringify(data).trimEnd();
  const out = `---\n${yamlText}\n---\n\n${body.replace(/^\n+/, "")}`;
  fs.writeFileSync(filePath, out);
}

// ---------- 1. Concept metadata (ID → overrides) ----------

const conceptOverrides = {
  "math-calculus-limits-informal-idea": {
    role: "core",
    difficulty: "intro",
    kind: "definition",
    proofLevel: "none",
    status: "stable",
    prerequisites: ["math-foundations-functions-basic"],
    relatedConcepts: [
      "math-calculus-limits-graphical-numerical",
      "math-calculus-limits-notation",
      "math-calculus-limits-one-sided"
    ],
    learningGoals: [
      "Explain the intuitive meaning of \"f(x) approaches L as x approaches a\".",
      "Distinguish limit behavior from the value of the function at the point.",
      "Recognize that limits describe behavior near a point, not at the point."
    ]
  },
  "math-calculus-limits-graphical-numerical": {
    role: "supporting",
    difficulty: "intro",
    kind: "object",
    proofLevel: "none",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-one-sided",
      "math-calculus-limits-infinite-limits",
      "math-calculus-limits-discontinuities-classification"
    ],
    learningGoals: [
      "Identify limit behavior from graphs and numerical tables.",
      "Distinguish stable approach behavior from visual or numerical noise.",
      "Recognize one-sided, infinite, and discontinuous behavior graphically."
    ]
  },
  "math-calculus-limits-notation": {
    role: "core",
    difficulty: "intro",
    kind: "definition",
    proofLevel: "none",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-informal-idea",
      "math-calculus-limits-one-sided",
      "math-calculus-limits-epsilon-delta-definition"
    ],
    learningGoals: [
      "Read and write standard limit notation, including one-sided limits.",
      "Translate between verbal descriptions of limiting behavior and symbolic notation.",
      "Interpret lim_{x→a} f(x) = L in terms of function behavior near a point."
    ]
  },
  "math-calculus-limits-limit-laws": {
    role: "core",
    difficulty: "intro",
    kind: "theorem",
    proofLevel: "sketch",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-computation-strategies",
      "math-calculus-limits-squeeze-theorem"
    ],
    learningGoals: [
      "State and apply the algebraic limit laws.",
      "Identify when a limit law is applicable based on hypotheses.",
      "Use limit laws to reduce complex expressions to simpler parts."
    ]
  },
  "math-calculus-limits-computation-strategies": {
    role: "supporting",
    difficulty: "intro",
    kind: "technique",
    proofLevel: "none",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-limit-laws",
      "math-calculus-limits-infinite-limits",
      "math-calculus-limits-limits-at-infinity"
    ],
    learningGoals: [
      "Use algebraic manipulations such as factoring and rationalization to simplify limit expressions.",
      "Identify common algebraic strategies for resolving indeterminate forms.",
      "Choose between graphical, numerical, and algebraic strategies when evaluating a limit."
    ]
  },
  "math-calculus-limits-one-sided": {
    role: "core",
    difficulty: "intro",
    kind: "definition",
    proofLevel: "none",
    status: "stable",
    prerequisites: ["math-calculus-limits-notation"],
    relatedConcepts: [
      "math-calculus-limits-infinite-limits",
      "math-calculus-limits-discontinuities-classification",
      "math-calculus-limits-continuity-point"
    ],
    learningGoals: [
      "Interpret and use left-hand and right-hand limit notation.",
      "Identify situations where one-sided limits exist but the full limit does not.",
      "Understand how one-sided limits determine continuity and discontinuity types."
    ]
  },
  "math-calculus-limits-infinite-limits": {
    role: "core",
    difficulty: "intro",
    kind: "definition",
    proofLevel: "none",
    status: "stable",
    prerequisites: [
      "math-calculus-limits-one-sided",
      "math-calculus-limits-limit-laws"
    ],
    relatedConcepts: [
      "math-calculus-limits-limits-at-infinity",
      "math-calculus-limits-discontinuities-classification"
    ],
    learningGoals: [
      "Interpret infinite limits using one-sided limit notation.",
      "Recognize vertical asymptotes as infinite-limit behavior.",
      "Distinguish infinite limits from oscillatory 'does not exist' cases."
    ]
  },
  "math-calculus-limits-at-infinity": {
    role: "core",
    difficulty: "intro",
    kind: "definition",
    proofLevel: "none",
    status: "stable",
    prerequisites: ["math-calculus-limits-limit-laws"],
    relatedConcepts: [
      "math-calculus-limits-infinite-limits",
      "math-calculus-limits-computation-strategies"
    ],
    learningGoals: [
      "Interpret limits where x approaches +∞ or −∞.",
      "Identify horizontal asymptotes using limit notation.",
      "Apply dominant-term reasoning to rational and polynomial functions."
    ]
  },
  "math-calculus-limits-continuity-point": {
    role: "core",
    difficulty: "bridge",
    kind: "definition",
    proofLevel: "idea",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-continuity-interval",
      "math-calculus-limits-discontinuities-classification",
      "math-calculus-limits-epsilon-delta-definition"
    ],
    learningGoals: [
      "State the definition of continuity at a point in terms of limits and function values.",
      "Diagnose whether a function is continuous at a point using limit behavior.",
      "Relate continuity at a point to local graph behavior."
    ]
  },
  "math-calculus-limits-continuity-interval": {
    role: "core",
    difficulty: "bridge",
    kind: "definition",
    proofLevel: "idea",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-continuity-point",
      "math-calculus-limits-ivt"
    ],
    learningGoals: [
      "Define continuity on an interval and distinguish it from continuity at a point.",
      "Recognize when a function fails to be continuous on an interval due to isolated points.",
      "Connect interval continuity to global theorems like the Intermediate Value Theorem."
    ]
  },
  "math-calculus-limits-discontinuities-classification": {
    role: "supporting",
    difficulty: "bridge",
    kind: "definition",
    proofLevel: "none",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-removable-discontinuities",
      "math-calculus-limits-continuity-point",
      "math-calculus-limits-infinite-limits"
    ],
    learningGoals: [
      "Classify discontinuities as removable, jump, or infinite.",
      "Connect each type of discontinuity to corresponding limit behavior.",
      "Decide when redefining a function can remove a discontinuity."
    ]
  },
  "math-calculus-limits-removable-discontinuities": {
    role: "supporting",
    difficulty: "bridge",
    kind: "definition",
    proofLevel: "none",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-discontinuities-classification",
      "math-calculus-limits-continuity-point",
      "math-calculus-limits-computation-strategies"
    ],
    learningGoals: [
      "Define removable discontinuity in terms of limits and function values.",
      "Use algebraic simplification to detect removable discontinuities.",
      "Redefine a function to extend it continuously across a removable discontinuity."
    ]
  },
  "math-calculus-limits-epsilon-delta-definition": {
    role: "core",
    difficulty: "challenging",
    kind: "definition",
    proofLevel: "formal",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-epsilon-delta-proofs",
      "math-calculus-limits-squeeze-theorem"
    ],
    learningGoals: [
      "State the epsilon–delta definition of limit precisely.",
      "Translate between informal 'getting arbitrarily close' language and epsilon–delta quantifiers.",
      "Identify the conceptual roles of epsilon, delta, x, a, and L in the limit definition."
    ]
  },
  "math-calculus-limits-epsilon-delta-proofs": {
    role: "core",
    difficulty: "challenging",
    kind: "method",
    proofLevel: "formal",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-epsilon-delta-definition",
      "math-calculus-limits-limit-laws"
    ],
    learningGoals: [
      "Construct epsilon–delta proofs for basic limits.",
      "Identify the key algebraic steps needed to relate |f(x) − L| to |x − a|.",
      "Understand how delta choices depend on epsilon."
    ]
  },
  "math-calculus-limits-squeeze-theorem": {
    role: "core",
    difficulty: "challenging",
    kind: "theorem",
    proofLevel: "idea",
    status: "stable",
    learningGoals: [
      "State the Squeeze Theorem precisely and identify the bounding functions.",
      "Use squeezing arguments to compute limits with oscillatory or complicated behavior.",
      "Recognize when bounding is a more natural strategy than direct algebra."
    ]
  },
  "math-calculus-limits-ivt": {
    role: "core",
    difficulty: "bridge",
    kind: "theorem",
    proofLevel: "idea",
    status: "stable",
    relatedConcepts: [
      "math-calculus-limits-continuity-interval",
      "math-calculus-limits-continuity-point"
    ],
    learningGoals: [
      "State the Intermediate Value Theorem with all hypotheses.",
      "Apply the IVT to show the existence of roots or solutions on an interval.",
      "See the IVT as a global consequence of continuity on an interval."
    ]
  }
};

// ---------- 2. Lesson metadata overrides ----------

const lessonOverrides = {
  "math-calculus-limits-lesson-01": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    order: 1,
    status: "stable",
    concepts: [
      "math-calculus-limits-informal-idea",
      "math-calculus-limits-graphical-numerical",
      "math-calculus-limits-notation"
    ]
  },
  "math-calculus-limits-lesson-02": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    order: 2,
    status: "stable",
    concepts: [
      "math-calculus-limits-limit-laws",
      "math-calculus-limits-computation-strategies"
    ]
  },
  "math-calculus-limits-lesson-03": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    order: 3,
    status: "stable",
    concepts: [
      "math-calculus-limits-one-sided",
      "math-calculus-limits-infinite-limits",
      "math-calculus-limits-at-infinity"
    ]
  },
  "math-calculus-limits-lesson-04": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    order: 4,
    status: "stable",
    concepts: [
      "math-calculus-limits-continuity-point",
      "math-calculus-limits-continuity-interval",
      "math-calculus-limits-discontinuities-classification",
      "math-calculus-limits-removable-discontinuities"
    ]
  },
  "math-calculus-limits-lesson-05": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    order: 5,
    status: "stable",
    concepts: ["math-calculus-limits-epsilon-delta-definition"]
  },
  "math-calculus-limits-lesson-06": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    order: 6,
    status: "stable",
    concepts: [
      "math-calculus-limits-epsilon-delta-proofs",
      "math-calculus-limits-squeeze-theorem",
      "math-calculus-limits-ivt"
    ]
  }
};

// ---------- 3. Exercise metadata overrides ----------

const exerciseOverrides = {
  "math-calculus-limits-lesson-01-exercises": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    lessonId: "math-calculus-limits-lesson-01",
    order: 1,
    status: "stable",
    concepts: [
      "math-calculus-limits-informal-idea",
      "math-calculus-limits-graphical-numerical",
      "math-calculus-limits-notation"
    ]
  },
  "math-calculus-limits-lesson-02-exercises": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    lessonId: "math-calculus-limits-lesson-02",
    order: 2,
    status: "stable",
    concepts: [
      "math-calculus-limits-limit-laws",
      "math-calculus-limits-computation-strategies"
    ]
  },
  "math-calculus-limits-lesson-03-exercises": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    lessonId: "math-calculus-limits-lesson-03",
    order: 3,
    status: "stable",
    concepts: [
      "math-calculus-limits-one-sided",
      "math-calculus-limits-infinite-limits",
      "math-calculus-limits-at-infinity"
    ]
  },
  "math-calculus-limits-lesson-04-exercises": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    lessonId: "math-calculus-limits-lesson-04",
    order: 4,
    status: "stable",
    concepts: [
      "math-calculus-limits-continuity-point",
      "math-calculus-limits-continuity-interval",
      "math-calculus-limits-discontinuities-classification",
      "math-calculus-limits-removable-discontinuities"
    ]
  },
  "math-calculus-limits-lesson-05-exercises": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    lessonId: "math-calculus-limits-lesson-05",
    order: 5,
    status: "stable",
    concepts: ["math-calculus-limits-epsilon-delta-definition"]
  },
  "math-calculus-limits-lesson-06-exercises": {
    subject: "mathematics",
    macroId: "math-calculus",
    courseId: "math-calculus-limits",
    lessonId: "math-calculus-limits-lesson-06",
    order: 6,
    status: "stable",
    concepts: [
      "math-calculus-limits-epsilon-delta-proofs",
      "math-calculus-limits-squeeze-theorem",
      "math-calculus-limits-ivt"
    ]
  }
};

// ---------- 4. Update helpers ----------

function updateConcepts() {
  const dir = resolve(
    "src",
    "content",
    "concepts",
    "mathematics",
    "calculus",
    "limits"
  );
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const { data, body } = loadFrontmatter(filePath);
    const id = data.id;
    if (!id) continue;
    const overrides = conceptOverrides[id];
    if (!overrides) continue;
    // Ensure course linkage is set
    data.subject = "mathematics";
    data.macroId = "math-calculus";
    data.courseId = "math-calculus-limits";
    Object.assign(data, overrides);
    saveFrontmatter(filePath, data, body);
    console.log(`Updated concept: ${id}`);
  }
}

function updateLessons() {
  const dir = resolve(
    "src",
    "content",
    "lessons",
    "mathematics",
    "calculus",
    "limits"
  );
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const { data, body } = loadFrontmatter(filePath);
    const id = data.id;
    if (!id) continue;
    const overrides = lessonOverrides[id];
    if (!overrides) continue;
    Object.assign(data, overrides);
    saveFrontmatter(filePath, data, body);
    console.log(`Updated lesson: ${id}`);
  }
}

function updateExercises() {
  const dir = resolve(
    "src",
    "content",
    "exercises",
    "mathematics",
    "calculus",
    "limits"
  );
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const { data, body } = loadFrontmatter(filePath);
    const id = data.id;
    if (!id) continue;
    const overrides = exerciseOverrides[id];
    if (!overrides) continue;
    Object.assign(data, overrides);
    saveFrontmatter(filePath, data, body);
    console.log(`Updated exercises: ${id}`);
  }
}

// ---------- 5. Create mixed-review exercise file ----------

function ensureMixedReview() {
  const dir = resolve(
    "src",
    "content",
    "exercises",
    "mathematics",
    "calculus",
    "limits"
  );
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, "math-calculus-limits-review.mdx");
  if (fs.existsSync(filePath)) {
    console.log("Mixed review file already exists, skipping create.");
    return;
  }
  const content = `---
id: math-calculus-limits-review
subject: mathematics
macroId: math-calculus
courseId: math-calculus-limits
lessonId: math-calculus-limits-lesson-06
title: "Limits – Mixed Review"
order: 7
status: stable
concepts:
  - math-calculus-limits-informal-idea
  - math-calculus-limits-graphical-numerical
  - math-calculus-limits-notation
  - math-calculus-limits-limit-laws
  - math-calculus-limits-computation-strategies
  - math-calculus-limits-one-sided
  - math-calculus-limits-infinite-limits
  - math-calculus-limits-at-infinity
  - math-calculus-limits-continuity-point
  - math-calculus-limits-continuity-interval
  - math-calculus-limits-discontinuities-classification
  - math-calculus-limits-removable-discontinuities
  - math-calculus-limits-epsilon-delta-definition
  - math-calculus-limits-epsilon-delta-proofs
  - math-calculus-limits-squeeze-theorem
  - math-calculus-limits-ivt
tags:
  - limits
  - mixed-review
  - calculus
problems:
  - id: lim-review-A-01
    label: "A1"
    difficulty: "A"
    topics:
      - math-calculus-limits-graphical-numerical
      - math-calculus-limits-informal-idea
    prompt: >
      The graph of $f$ is shown (assume an appropriate graph is provided). Estimate
      $\\lim_{x \\to -1} f(x)$ and $f(-1)$, and explain whether they are equal.
    solution: >
      From the graph, as $x$ approaches $-1$ from both sides, the $y$-values approach
      some value $L$ (read from the graph). If the point at $x = -1$ is filled at a
      different height $f(-1) \\neq L$, then $\\lim_{x \\to -1} f(x) = L$ exists but
      $f(-1) \\neq L$, so there is a removable discontinuity.

  - id: lim-review-A-02
    label: "A2"
    difficulty: "A"
    topics:
      - math-calculus-limits-limit-laws
    prompt: >
      Compute $\\displaystyle \\lim_{x \\to 2} (3x^2 - 5x + 1)$ using limit laws.
    solution: >
      Using limit laws and continuity of polynomials,
      $$
      \\lim_{x \\to 2} (3x^2 - 5x + 1)
      = 3(2^2) - 5(2) + 1
      = 3 \\cdot 4 - 10 + 1
      = 12 - 10 + 1 = 3.
      $$

  - id: lim-review-A-03
    label: "A3"
    difficulty: "A"
    topics:
      - math-calculus-limits-continuity-point
    prompt: >
      Let $g(x) = \\begin{cases}
      x^2 & x \\neq 1, \\\\
      3 & x = 1.
      \\end{cases}$
      Determine whether $g$ is continuous at $x = 1$.
    solution: >
      We have $\\lim_{x \\to 1} g(x) = \\lim_{x \\to 1} x^2 = 1$, but $g(1) = 3$.
      Since the limit exists and is $1$ but $g(1) \\neq 1$, $g$ is not continuous
      at $x=1$. This is a removable discontinuity.

  - id: lim-review-B-01
    label: "B1"
    difficulty: "B"
    topics:
      - math-calculus-limits-computation-strategies
      - math-calculus-limits-removable-discontinuities
    prompt: >
      Compute $\\displaystyle \\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.
      Explain your method and describe the type of discontinuity (if any)
      at $x = 2$ for the function $h(x) = \\frac{x^2 - 4}{x - 2}$.
    solution: >
      Factor:
      $$
      \\frac{x^2 - 4}{x - 2} = \\frac{(x-2)(x+2)}{x-2} = x + 2, \\quad x \\neq 2.
      $$
      So
      $$
      \\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2} (x+2) = 4.
      $$
      The function $h$ has a hole at $x=2$ (removable discontinuity) since the
      simplified expression is defined there but the original is not.

  - id: lim-review-B-02
    label: "B2"
    difficulty: "B"
    topics:
      - math-calculus-limits-infinite-limits
      - math-calculus-limits-one-sided
    prompt: >
      Consider $\\displaystyle f(x) = \\frac{1}{(x-3)^2}$. Compute
      $\\lim_{x \\to 3^-} f(x)$, $\\lim_{x \\to 3^+} f(x)$, and classify the
      behavior at $x = 3$.
    solution: >
      As $x \\to 3$, $(x-3)^2 \\to 0^+$, so $\\frac{1}{(x-3)^2} \\to +\\infty$ from
      both sides. Thus
      $$
      \\lim_{x \\to 3^-} f(x) = \\lim_{x \\to 3^+} f(x) = +\\infty.
      $$
      There is a vertical asymptote at $x=3$ and an infinite discontinuity there.

  - id: lim-review-B-03
    label: "B3"
    difficulty: "B"
    topics:
      - math-calculus-limits-limits-at-infinity
    prompt: >
      Compute $\\displaystyle \\lim_{x \\to \\infty} \\frac{2x^2 - x + 1}{x^2 + 3}$.
    solution: >
      Divide numerator and denominator by $x^2$:
      $$
      \\frac{2 - \\frac{1}{x} + \\frac{1}{x^2}}{1 + \\frac{3}{x^2}} \\xrightarrow[x\\to\\infty]{} \\frac{2}{1} = 2.
      $$
      So the limit is $2$ and $y=2$ is a horizontal asymptote.

  - id: lim-review-C-01
    label: "C1"
    difficulty: "C"
    topics:
      - math-calculus-limits-epsilon-delta-definition
      - math-calculus-limits-epsilon-delta-proofs
    prompt: >
      Using the $\\varepsilon$–$\\delta$ definition of limit, prove that
      $\\displaystyle \\lim_{x \\to 2} (3x + 1) = 7$.
    solution: >
      We want: for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that
      $0 < |x-2| < \\delta$ implies $|(3x+1) - 7| < \\varepsilon$.
      Note that
      $$
      |(3x+1) - 7| = |3x - 6| = 3|x-2|.
      $$
      If we choose $\\delta = \\varepsilon/3$, then whenever $0 < |x-2| < \\delta$
      we have
      $$
      |(3x+1)-7| = 3|x-2| < 3\\delta = 3\\cdot \\frac{\\varepsilon}{3} = \\varepsilon.
      $$
      This proves the limit.

  - id: lim-review-C-02
    label: "C2"
    difficulty: "C"
    topics:
      - math-calculus-limits-squeeze-theorem
    prompt: >
      Show that $\\displaystyle \\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right) = 0$
      using the Squeeze Theorem.
    solution: >
      For all real $t$, $|\\sin t| \\le 1$, so
      $$
      -x^2 \\le x^2 \\sin\\left(\\frac{1}{x}\\right) \\le x^2
      $$
      for all $x \\neq 0$. As $x \\to 0$, both $-x^2$ and $x^2$ have limit $0$,
      so by the Squeeze Theorem the middle expression also has limit $0$.

  - id: lim-review-C-03
    label: "C3"
    difficulty: "C"
    topics:
      - math-calculus-limits-ivt
      - math-calculus-limits-continuity-interval
    prompt: >
      Let $f(x) = x^3 - x - 1$. Show that the equation $f(x) = 0$ has a solution
      in the interval $(1, 2)$.
    solution: >
      First compute $f(1) = 1 - 1 - 1 = -1$ and $f(2) = 8 - 2 - 1 = 5$.
      Thus $f(1) < 0$ and $f(2) > 0$. The function $f$ is a polynomial, hence
      continuous on the closed interval $[1,2]$. By the Intermediate Value Theorem
      there exists $c \\in (1,2)$ such that $f(c) = 0$. So the equation has
      at least one root in $(1,2)$.
---

## Tier A – Core Skills

See problems A1–A3 above.

## Tier B – Standard Problems

See problems B1–B3 above.

## Tier C – Challenge / Proofs

See problems C1–C3 above.
`;
  fs.writeFileSync(filePath, content);
  console.log(`Created mixed review exercises: ${filePath}`);
}

// ---------- 6. Create course index page ----------

function ensureCourseIndex() {
  const dir = resolve("src", "pages", "courses");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, "math-calculus-limits.astro");
  if (fs.existsSync(filePath)) {
    console.log("Course index page already exists, skipping create.");
    return;
  }
  const content = `---
import DocsLayout from "../../layouts/DocsLayout.astro";
import { collectionNames } from "../../lib/collections";
import { getCollection } from "astro:content";

const courseId = "math-calculus-limits";

const courses = await getCollection(collectionNames.courses);
const lessons = await getCollection(collectionNames.lessons);
const exercises = await getCollection(collectionNames.exercises);
const concepts = await getCollection(collectionNames.concepts);

const course = courses.find((c) => c.data.id === courseId || c.slug === courseId);

if (!course) {
  throw new Error(\`Course not found: \${courseId}\`);
}

const data = course.data;

const lessonsForCourse = lessons
  .filter((l) => {
    const d = l.data;
    return d.courseId === courseId || d.course === courseId;
  })
  .sort((a, b) => {
    const ao = a.data.order ?? 0;
    const bo = b.data.order ?? 0;
    if (ao !== bo) return ao - bo;
    return (a.data.title ?? "").localeCompare(b.data.title ?? "");
  });

const exercisesForCourse = exercises.filter((e) => {
  const d = e.data;
  return d.courseId === courseId || d.course === courseId;
});

const exercisesByLessonId = new Map();

for (const ex of exercisesForCourse) {
  const lid = ex.data.lessonId;
  if (!lid) continue;
  const arr = exercisesByLessonId.get(lid) ?? [];
  arr.push(ex);
  exercisesByLessonId.set(lid, arr);
}

const conceptsForCourse = concepts
  .filter((c) => c.data.courseId === courseId || c.data.course === courseId)
  .sort((a, b) => {
    const ao = a.data.order ?? 0;
    const bo = b.data.order ?? 0;
    if (ao !== bo) return ao - bo;
    return (a.data.title ?? "").localeCompare(b.data.title ?? "");
  });
---

<DocsLayout title={data.title ?? "Limits"} description={data.description}>
  <section class="space-y-6">
    <header class="space-y-2">
      <p class="text-sm uppercase tracking-wide text-gray-500">
        Course
      </p>
      <h1 class="text-3xl font-semibold">
        {data.title ?? "Limits"}
      </h1>
      {data.description && (
        <p class="text-base text-gray-600">
          {data.description}
        </p>
      )}
      {data.learningGoals && data.learningGoals.length > 0 && (
        <div class="mt-4">
          <h2 class="text-lg font-medium mb-1">Course learning goals</h2>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            {data.learningGoals.map((goal) => (
              <li>{goal}</li>
            ))}
          </ul>
        </div>
      )}
    </header>

    <section class="space-y-3">
      <h2 class="text-2xl font-semibold">Lessons &amp; exercises</h2>
      <ol class="space-y-4">
        {lessonsForCourse.map((lesson) => {
          const ld = lesson.data;
          const lessonUrl = \`/lessons/\${lesson.slug}\`;
          const lessonExercises = (exercisesByLessonId.get(ld.id) ?? []).slice().sort(
            (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)
          );

          return (
            <li class="border border-gray-200 rounded-md p-4">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs uppercase tracking-wide text-gray-400">
                    Lesson {ld.order ?? ""}
                  </p>
                  <a href={lessonUrl} class="text-lg font-medium hover:underline">
                    {ld.title}
                  </a>
                  {ld.description && (
                    <p class="mt-1 text-sm text-gray-600">
                      {ld.description}
                    </p>
                  )}
                  {ld.concepts && ld.concepts.length > 0 && (
                    <p class="mt-2 text-xs text-gray-500">
                      Concepts:{" "}
                      {ld.concepts.map((cid, i) => {
                        const conceptEntry = concepts.find(
                          (c) => c.data.id === cid || c.slug === cid
                        );
                        const name = conceptEntry?.data.title ?? cid;
                        const url = conceptEntry
                          ? \`/concepts/\${conceptEntry.slug}\`
                          : undefined;
                        return (
                          <>
                            {i > 0 && ", "}
                            {url ? (
                              <a href={url} class="underline decoration-dotted">
                                {name}
                              </a>
                            ) : (
                              name
                            )}
                          </>
                        );
                      })}
                    </p>
                  )}
                </div>
                {lessonExercises.length > 0 && (
                  <div class="text-sm text-right space-y-1">
                    <p class="font-medium text-gray-700">Exercises</p>
                    <ul class="space-y-1">
                      {lessonExercises.map((ex) => (
                        <li>
                          <a
                            href={\`/exercises/\${ex.slug}\`}
                            class="text-sm text-blue-600 hover:underline"
                          >
                            {ex.data.title ?? "Exercise set"}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-semibold">Concept map (course view)</h2>
      <p class="text-sm text-gray-600">
        These are the core concept nodes registered to this course.
      </p>
      <ul class="grid gap-3 md:grid-cols-2">
        {conceptsForCourse.map((c) => (
          <li class="border border-gray-200 rounded-md p-3">
            <a
              href={\`/concepts/\${c.slug}\`}
              class="font-medium text-sm hover:underline"
            >
              {c.data.title}
            </a>
            {c.data.role && (
              <span class="ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-500">
                {c.data.role}
              </span>
            )}
            {c.data.summary && (
              <p class="mt-1 text-xs text-gray-600">{c.data.summary}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  </section>
</DocsLayout>
`;
  fs.writeFileSync(filePath, content);
  console.log(`Created course index page: ${filePath}`);
}

// ---------- 7. Run all steps ----------

function main() {
  console.log("=== Wrapping up math-calculus-limits vertical ===");
  updateConcepts();
  updateLessons();
  updateExercises();
  ensureMixedReview();
  ensureCourseIndex();
  console.log("Done. Inspect changes with git diff and run your build.");
}

main();
