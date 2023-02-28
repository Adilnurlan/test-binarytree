import BinarySearchTree from "./js_binary_search_tree.js";
import initiateHandlers from "./bst-ui.js";

export const renderBinarySearchTree = (node) => {
  if (!node) {
    return "";
  }
  const { left, right, value } = node;
  return `
    <div class="node__element" data-node-id="${value}">${value}</div>
    ${
      left || right
        ? `
          <div class="node__bottom-line"></div>
          <div class="node__children">
          <div class="node node--left">
          ${left ? renderBinarySearchTree(left) : ""}
          </div>
          <div class="node node--right">
          ${right ? renderBinarySearchTree(right) : ""}
          </div>
            
          </div>
        `
        : ""
    }
  `;
};

const myTree = new BinarySearchTree();

const reRender = (tree, render) => {
  const treeDOMElement = document.querySelector(".tree");
  treeDOMElement.innerHTML = render(tree.root);
};

const main = () => {
  reRender(myTree, renderBinarySearchTree);
  const treeDOMElement = document.querySelector(".tree");
  treeDOMElement.innerHTML = renderBinarySearchTree(myTree.root);
  initiateHandlers(myTree, () => {
    reRender(myTree, renderBinarySearchTree);
  });
};

main();
