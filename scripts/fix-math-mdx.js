// scripts/fix-math-mdx.js
// Run with: node scripts/fix-math-mdx.js

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'src', 'content');

// Limit scope: only the limits pilot
const TARGET_DIRS = [
  path.join(ROOT, 'concepts', 'mathematics', 'calculus', 'limits'),
  path.join(ROOT, 'lessons', 'mathematics', 'calculus', 'limits'),
  path.join(ROOT, 'exercises', 'mathematics', 'calculus', 'limits'),
];

// Heuristics: patterns that "smell" like LaTeX math
const INLINE_MATH_HINTS = [
  '\\lim',
  '\\forall',
  '\\exists',
  '\\epsilon',
  '\\varepsilon',
  '\\delta',
  '\\Rightarrow',
  '\\rightarrow',
  '\\to ',
  '\\le',
  '\\ge',
  '\\sin',
  '\\cos',
  '\\tan',
];

function isMdxFile(filePath) {
  return filePath.endsWith('.mdx');
}

function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, files);
    } else if (entry.isFile() && isMdxFile(full)) {
      files.push(full);
    }
  }
  return files;
}

function splitFrontmatter(content) {
  if (!content.startsWith('---')) return { frontmatter: '', body: content };
  const lines = content.split('\n');
  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIndex = i;
      break;
    }
  }
  if (endIndex === -1) return { frontmatter: '', body: content };
  const frontmatter = lines.slice(0, endIndex + 1).join('\n');
  const body = lines.slice(endIndex + 1).join('\n');
  return { frontmatter, body };
}

function hasMathDelimiters(line) {
  return line.includes('$') || line.includes('\\(') || line.includes('\\)');
}

function normalizeMathBlocks(text) {
  let out = text;

  // 1) \[ ... \]  ->  $$ ... $$
  out = out.replace(/\\\[(.*?)\\\]/gs, (_m, inner) => {
    return `$$\n${inner.trim()}\n$$`;
  });

  // 2) \( ... \)  ->  $ ... $
  out = out.replace(/\\\((.*?)\\\)/gs, (_m, inner) => {
    return `$ ${inner.trim()} $`;
  });

  // 3) Collapse repeated empty $$ pairs like "$$\n$$"
  out = out.replace(/\$\$\s*\n\s*\$\$/g, '$$');
  out = out.replace(/\$\$\s*\n\s*\$\$/g, '$$');

  return out;
}

function transformBody(body) {
  let out = normalizeMathBlocks(body);

  const lines = out.split('\n');
  const result = [];
  let insideBlockMath = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();

    // Code fences: don't touch content in code blocks
    const isFence = trimmed.startsWith('```');
    if (isFence) {
      result.push(line);
      continue;
    }

    // Toggle block math on bare "$$" lines
    if (trimmed === '$$') {
      insideBlockMath = !insideBlockMath;
      result.push(line);
      continue;
    }

    if (insideBlockMath) {
      // Inside $$ ... $$: leave TeX alone
      result.push(line);
      continue;
    }

    // Outside block math:

    // Skip headings / empty lines
    if (trimmed === '' || trimmed.startsWith('#')) {
      result.push(line);
      continue;
    }

    // Already has $ or \(...\) -> leave
    if (hasMathDelimiters(line)) {
      result.push(line);
      continue;
    }

    // Line starts with a TeX control sequence: treat as display math block
    if (/^\\[a-zA-Z]/.test(trimmed)) {
      result.push('$$');
      result.push(trimmed);
      result.push('$$');
      continue;
    }

    // Line contains LaTeX hints: wrap full line as inline math
    if (INLINE_MATH_HINTS.some((hint) => line.includes(hint))) {
      result.push(`$ ${trimmed} $`);
      continue;
    }

    result.push(line);
  }

  return result.join('\n');
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = splitFrontmatter(original);

  const newBody = transformBody(body);
  const combined =
    frontmatter && frontmatter.length > 0
      ? `${frontmatter}\n${newBody.startsWith('\n') ? '' : '\n'}${newBody}`
      : newBody;

  if (combined !== original) {
    console.log(`Updated: ${path.relative(process.cwd(), filePath)}`);
    fs.writeFileSync(filePath, combined, 'utf8');
  } else {
    console.log(`No change: ${path.relative(process.cwd(), filePath)}`);
  }
}

function main() {
  const files = TARGET_DIRS.flatMap((dir) => walkDir(dir));
  if (files.length === 0) {
    console.log('No MDX files found for limits course.');
    return;
  }
  console.log(`Processing ${files.length} MDX files...`);
  for (const file of files) {
    processFile(file);
  }
  console.log('Done. Review changes with `git diff`.');
}

main();
