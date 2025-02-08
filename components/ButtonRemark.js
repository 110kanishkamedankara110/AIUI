import { visit } from "unist-util-visit";

const QuestionRemark = () => {
  return (tree) => {
    visit(tree, "paragraph", (node, index, parent) => {
      if (!node.children || node.children.length === 0) return;

      const text = node.children.map((c) => ("value" in c ? c.value : "")).join("");

      const match = text.match(/^:::question\s(.+?):::$/);
      if (match) {
        const questionText = match[1];

        // Replace the paragraph node with a valid JSX button
        parent.children[index] = {
          type: "button",
          data: {
            hProperties: {              
            },
          },
          children: [{ type: "text", value: questionText }],
        };
      }
    });
  };
};

export default QuestionRemark;
