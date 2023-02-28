const COMPARISON = {
  EQUAL: 0,
  SMALLER: -1,
  GREATER: 1,
};

const defaultCompareNumberFn = (a, b) => {
  if (Number(a) === Number(b)) {
    return COMPARISON.EQUAL;
  }

  return Number(a) < Number(b) ? COMPARISON.SMALLER : COMPARISON.GREATER;
};

class TreeNode {
  constructor(value, parent) {
    this.value = value.toString();
    this.parent = parent || null;
    this.left = null;
    this.right = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get hasChild() {
    return !this.isLeaf;
  }
}
class BinarySearchTree {
  constructor(compareFn = defaultCompareNumberFn) {
    this.root = null;
    this.compareFn = compareFn;
  }

  insert(value) {
    let node = this.root;
    let insertedNode;
    if (node === null) {
      this.root = new TreeNode(value);
      return this.root;
    }
    const nodeInserted = (() => {
      while (true) {
        const comparison = this.compareFn(value, node.value);
        if (comparison === COMPARISON.EQUAL) {
          insertedNode = node;
          return node;
        }
        if (comparison === COMPARISON.SMALLER) {
          if (node.left === null) {
            insertedNode = new TreeNode(value, node);
            node.left = insertedNode;
            return true;
          }
          node = node.left;
        } else if (comparison === COMPARISON.GREATER) {
          if (node.right === null) {
            insertedNode = new TreeNode(value, node);
            node.right = insertedNode;
            return true;
          }
          node = node.right;
        }
      }
    })();
    if (nodeInserted) {
      return insertedNode;
    }
  }
}

export default BinarySearchTree;
