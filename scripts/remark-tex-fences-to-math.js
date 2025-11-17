// scripts/remark-tex-fences-to-math.js
import { visit } from "unist-util-visit"

/**
 * Turn fenced ```tex blocks into remark-math "math" nodes.
 * That lets rehype-katex render them as display math.
 */
export function remarkTexFencesToMath() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || typeof index !== "number") return
      if (node.lang !== "tex") return

      parent.children[index] = {
        type: "math",
        value: node.value,
        data: {
          // Let rehype/MDX know how to render this node
          hName: "div",
          hProperties: { className: ["math-display"] },
        },
      }
    })
  }
}
