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
  let root = buildTree(arr);

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

  const tree = {
    insert(value) {
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
    },

    delete(value) {
      function traverseTree(node, number, parentNode, childPosition) {
        function traverseRight(newParent, newRightNode) {
          if (!newParent.right) {
            newParent.right = newRightNode;
            return;
          }
          traverseRight(newParent.right, newRightNode);
        }
        function traverseLeft(newParent, newLeftNode) {
          if (!newParent.left) {
            newParent.left = newLeftNode;
            newLeftNode.right = null;
            return;
          }
          traverseLeft(newParent.left, newLeftNode);
        }

        function findLeftMax(node) {
          if (node.right === null) {
            return node;
          }
          return findLeftMax(node.right);
        }

        let onlyChild;
        // Base case
        if (number === node.data) {
          // * Root deletion
          if (node === root) {
            root = findLeftMax(node.left);
            if (root.left) {
              traverseLeft(root.left, node.left);
            }
            root.right = node.right;
            return;
          }
          // Leaf node
          if (!node.left && !node.right) {
            childPosition === 'left'
              ? (parentNode.left = null)
              : (parentNode.right = null);
          }
          // Single child
          else if ((node.left && !node.right) || (!node.left && node.right)) {
            node.left ? (onlyChild = node.left) : (onlyChild = node.right);
            childPosition === 'left'
              ? (parentNode.left = onlyChild)
              : (parentNode.right = onlyChild);
          }
          // Two children
          else {
            childPosition === 'left'
              ? (parentNode.left = node.left)
              : (parentNode.right = node.left);
            traverseRight(node.left, node.right);
          }
          return node;
        }

        // Inexistent number case
        if (
          (number < node.data && !node.left) ||
          (number > node.data && !node.right)
        ) {
          return null;
        }

        // Recursive case
        if (number < node.data) {
          traverseTree(node.left, number, node, 'left');
        } else {
          traverseTree(node.right, number, node, 'right');
        }
      }

      return traverseTree(root, value);
    },

    find(value) {
      function traverseTree(number, node) {
        // Base case
        if (node.data === number) {
          return node;
        }

        // Recursive case
        if (number < node.data && node.left) {
          return traverseTree(number, node.left);
        }
        if (number > node.data && node.right) {
          return traverseTree(number, node.right);
        }
        return null;
      }
      return traverseTree(value, root);
    },

    levelOrder(callback) {
      const returnArray = [];
      const queue = [];

      // No callback case
      function logDataBFS(node) {
        if (!node) {
          return null;
        }
        if (node === root) {
          queue.push(node);
        }
        returnArray.push(queue.shift().data);

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        if (queue.length === 0) {
          return returnArray;
        }
        logDataBFS(queue[0]);
      }

      // Callback case
      function traverseBFS(node, cb) {
        if (!node) {
          return null;
        }
        if (node === root) {
          queue.push(node);
        }
        returnArray.push(root.cb(queue.shift()));

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
        if (queue.length === 0) {
          return returnArray;
        }
        traverseBFS(queue[0], cb);
      }

      // Main
      if (!callback) {
        return logDataBFS(root);
      }
      return traverseBFS(root, callback);
    },

    inOrder(callback) {},
    preOrder(callback) {},

    height(node) {
      // return node's height === # of edges in the longest path from given node to leaf node
    },
    depth(node) {
      // return node's depth === # of edges in the path from a given node to the tree’s root node.
    },

    isBalanced() {},

    rebalance() {
      // Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
    },

    print() {
      prettyPrint(root);
    },
  };
  return tree;
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

tree.insert(2);
tree.insert(354);
tree.insert(35423);
tree.insert(6);
tree.insert(8);
tree.delete(7);
tree.delete(5);
tree.delete(4);
tree.delete(6345);
tree.delete(324);
tree.insert(4);
tree.delete(8);

tree.find(2);
tree.levelOrder();
// console.log(tree.print());
