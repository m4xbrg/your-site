#!/usr/bin/env python3
from pathlib import Path

ROOT = Path("src/content")  # adjust if needed

def transform_file(path: Path):
    text = path.read_text(encoding="utf-8").splitlines(keepends=True)
    out = []
    in_tex_block = False

    for line in text:
        stripped = line.strip()

        # Start of ```tex block
        if not in_tex_block and stripped == "```tex":
            out.append("$$\n")
            in_tex_block = True
        # End of ``` block (only if we are inside a tex block)
        elif in_tex_block and stripped == "```":
            out.append("$$\n")
            in_tex_block = False
        else:
            out.append(line)

    path.write_text("".join(out), encoding="utf-8")

def main():
    for mdx in ROOT.rglob("*.mdx"):
        transform_file(mdx)

if __name__ == "__main__":
    main()
