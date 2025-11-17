import fs from "fs";
import path from "path";

// Folders to apply this cleanup to
const TARGET_DIRS = [
  "src/content/concepts",
  "src/content/lessons",
  "src/content/exercises",
];

// Utility: recursively list .mdx files
function getFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getFiles(full));
    } else if (full.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
}

// ---- TRANSFORMATIONS ----

// 1) Remove $$ wrappers around fenced tex blocks
function removeNestedDollarMath(text) {
  return text.replace(/\$\$\s*```tex([\s\S]*?)```\s*\$\$/g, (m, inner) => {
    return "```tex\n" + inner.trim() + "\n```";
  });
}

// 2) Move markdown bullets out of ```tex blocks
function moveBulletsOutsideTex(text) {
  return text.replace(/```tex([\s\S]*?)```/g, (m, inner) => {
    // If the block contains markdown list items, unwrap it
    if (/-\s+[^$]/.test(inner)) {
      return (
        inner
          .split("\n")
          .map((line) => line.replace(/^\s*-\s*/, "- ")) // ensure proper bullet
          .join("\n")
      );
    }
    // Otherwise keep the tex block
    return "```tex\n" + inner.trim() + "\n```";
  });
}

// 3) Remove standalone text inside ```tex blocks
// (if the block contains no LaTeX commands, treat it as normal text)
function cleanNonMathTexBlocks(text) {
  return text.replace(/```tex([\s\S]*?)```/g, (m, inner) => {
    const trimmed = inner.trim();
    const hasMath = /\\[a-zA-Z]+|[_^{}]|\\\(|\\\)|\$/g.test(trimmed);
    if (!hasMath) {
      return trimmed; // unwrap raw text
    }
    return "```tex\n" + trimmed + "\n```";
  });
}

// 4) Ensure fences are balanced
function fixFenceBalance(text) {
  const lines = text.split("\n");
  let openTex = false;
  const out = [];

  for (let line of lines) {
    if (line.trim().startsWith("```tex")) {
      openTex = true;
      out.push("```tex");
      continue;
    }

    if (line.trim() === "```") {
      if (openTex) {
        out.push("```");
        openTex = false;
      } else {
        // stray fence — drop or convert to normal text
        continue;
      }
      continue;
    }

    out.push(line);
  }
  return out.join("\n");
}

// 5) Unify multiple small tex blocks into one
function mergeAdjacentTexBlocks(text) {
  return text.replace(/```tex([\s\S]*?)```\s*```tex([\s\S]*?)```/g, (m, a, b) => {
    return (
      "```tex\n" +
      a.trim() +
      "\n" +
      b.trim() +
      "\n```"
    );
  });
}

// ---- MAIN EXECUTION ----

function cleanContent(file) {
  let original = fs.readFileSync(file, "utf8");
  let cleaned = original;

  cleaned = removeNestedDollarMath(cleaned);
  cleaned = moveBulletsOutsideTex(cleaned);
  cleaned = cleanNonMathTexBlocks(cleaned);
  cleaned = mergeAdjacentTexBlocks(cleaned);
  cleaned = fixFenceBalance(cleaned);

  if (cleaned !== original) {
    fs.writeFileSync(file, cleaned, "utf8");
    console.log("Fixed:", file);
  }
}

for (const dir of TARGET_DIRS) {
  const full = path.resolve(dir);
  const files = getFiles(full);
  files.forEach(cleanContent);
}
