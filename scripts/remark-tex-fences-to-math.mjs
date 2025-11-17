// scripts/remark-tex-fences-to-math.mjs
import { visit } from 'unist-util-visit';

/**
 * Convert fenced ```tex blocks into remark-math "math" nodes.
 * This lets rehype-katex render them as display math.
 */
export default function remarkTexFencesToMath() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      if (node.lang !== 'tex') return;

      parent.children[index] = {
        type: 'math',
        value: node.value,
        data: {
          // rehype/Katex rendering hint
          hName: 'div',
          hProperties: { className: ['math-display'] },
        },
      };
    });
  };
}
