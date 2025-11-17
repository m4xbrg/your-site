// scripts/sanitize-math-temporary.js
// Temporary: make all LaTeX-ish lines into code so MDX/Acorn ignore them.
// Run with: node scripts/sanitize-math-temporary.js

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'src', 'content');

const TARGET_DIRS = [
  path.join(ROOT, 'concepts', 'mathematics', 'calculus', 'limits'),
  path.join(ROOT, 'lessons', 'mathematics', 'calculus', 'limits'),
  path.join(ROOT, 'exercises', 'mathematics', 'calculus', 'limits'),
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

function sanitizeBody(body) {
  const lines = body.split('\n');
  const result = [];
  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track ``` fences; don't touch content inside
    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence;
      result.push(line);
      continue;
    }

    if (inCodeFence) {
      result.push(line);
      continue;
    }

    // If line already starts with math/code markers, leave it
    if (trimmed.startsWith('$$') || trimmed.startsWith('$')) {
      result.push(line);
      continue;
    }

    // If line has no backslash, leave as-is
    if (!line.includes('\\')) {
      result.push(line);
      continue;
    }

    // Wrap this line as a code block so MDX treats it as literal text
    result.push('```tex');
    result.push(line);
    result.push('```');
  }

  return result.join('\n');
}

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = splitFrontmatter(original);

  const newBody = sanitizeBody(body);
  const combined =
    frontmatter && frontmatter.length > 0
      ? `${frontmatter}\n${newBody.startsWith('\n') ? '' : '\n'}${newBody}`
      : newBody;

  if (combined !== original) {
    console.log(`Sanitized: ${path.relative(process.cwd(), filePath)}`);
    fs.writeFileSync(filePath, combined, 'utf8');
  } else {
    console.log(`Unchanged: ${path.relative(process.cwd(), filePath)}`);
  }
}

function main() {
  const files = TARGET_DIRS.flatMap((dir) => walkDir(dir));
  if (files.length === 0) {
    console.log('No MDX files found for limits course.');
    return;
  }
  console.log(`Sanitizing ${files.length} MDX files...`);
  for (const file of files) {
    processFile(file);
  }
  console.log('Done. Review with `git diff` if needed.');
}


main();
