const { createNewNode } = require('./nodeFactory');

function filterSort(arr) {
  const filteredArray = [];
  arr.forEach((number) => {
    if (!filteredArray.includes(number)) {
      filteredArray.push(number);
    }
  });
  return filteredArray.sort((a, b) => a - b);
}
function createNewTree(arr) {
  const root = buildTree(arr);

  function buildTree(array) {
    const sortedArray = filterSort(array);

    function attachNodes(arr) {
      if (arr === null) {
        return null;
      }
      const start = 0;
      const end = arr.length - 1;
      if (start >= end) {
        return createNewNode(arr[start]);
      }

      const newRootIndex = Math.floor(arr.length / 2);
      const newRoot = arr[newRootIndex];
      const leftHalf = arr.slice(start, newRootIndex);
      let rightHalf = arr.slice(newRootIndex + 1);
      if (rightHalf.length < 1) {
        rightHalf = null;
      }

      return createNewNode(
        newRoot,
        attachNodes(leftHalf),
        attachNodes(rightHalf)
      );
    }

    return attachNodes(sortedArray);
  }

  // A new key is always inserted at the leaf by maintaining the property of the binary search tree. We start searching for a key from the root until we hit a leaf node. Once a leaf node is found, the new node is added as a child of the leaf node
  root.insert = (value) => {
    function traverseTree(node, number) {
      // Base case
      if (number === node.data) {
        return null;
      }
      // Recursive case
      if (number < node.data) {
        node.left
          ? traverseTree(node.left, number)
          : (node.left = createNewNode(number));
      } else if (number > node.data) {
        node.right
          ? traverseTree(node.right, number)
          : (node.right = createNewNode(number));
      }
    }
    return traverseTree(root, value);
  };

  root.delete = (value) => {
    // if leaf node => node = null
    // else if single child => node = single child
    // else => node = left child
  };

  root.find = (value) => {
    // return node
  };

  root.levelOrder = (cb) => {
    // traverse BFS
    // use a queue to log children nodes and dequeue (log out the queue to array) and enqueue (log into the queue)
    // return array with traverse data logs
  };

  root.inOrder = (cb) => {};
  root.preOrder = (cb) => {};
  root.postOrder = (cb) => {};

  root.height = (node) => {
    // return node's height === # of edges in the longest path from given node to leaf node
  };
  root.depth = (node) => {
    // return node's depth === # of edges in the path from a given node to the tree’s root node.
  };

  root.isBalanced = () => {};

  root.rebalance = () => {
    // Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
  };

  return { root };
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = createNewTree(testArray);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

console.log(tree.root.left.left);
tree.root.insert(2);
tree.root.insert(354);
tree.root.insert(35423);
tree.root.insert(6);
tree.root.insert(8);
console.log(tree.root);
prettyPrint(tree.root);
