const { createNewNode } = require('./nodeFactory');

function createNewTree(arr) {
  function filterSort(arrayToSort) {
    const filteredArray = [];
    arrayToSort.forEach((number) => {
      if (!filteredArray.includes(number)) {
        filteredArray.push(number);
      }
    });
    return filteredArray.sort((a, b) => a - b);
  }

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

  let root = buildTree(arr);

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
            const inOrderPredecessor = findLeftMax(node.left);
            node.data = inOrderPredecessor.data;
            traverseTree(node.left, inOrderPredecessor.data, node, 'left');
            return;
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
        returnArray.push(cb(queue.shift()));

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

    // * D = Print Data, L = Go Left, R = Go Right, !cb => logData
    // DLR
    inOrder(callback) {
      const returnArray = [];
      const queue = [];

      // No callback case
      function logDataInOrder(node) {
        if (!node) {
          return null;
        }
        if (node === root) {
          queue.push(node);
        }
        returnArray.push(queue.shift().data);

        if (node.left) {
          queue.push(node.left);
          logDataInOrder(node.left);
        }
        if (node.right) {
          queue.push(node.right);
          logDataInOrder(node.right);
        }
        return returnArray;
      }

      // Callback case
      function traverseInOrder(node, cb) {
        if (!node) {
          return null;
        }
        if (node === root) {
          queue.push(node);
        }
        returnArray.push(cb(queue.shift().data));

        if (node.left) {
          queue.push(node.left);
          traverseInOrder(node.left, cb);
        }
        if (node.right) {
          queue.push(node.right);
          traverseInOrder(node.right, cb);
        }
        return returnArray;
      }
      // Main
      if (!callback) {
        return logDataInOrder(root);
      }
      return traverseInOrder(root, callback);
    },
    // LDR
    preOrder(callback) {
      const returnArray = [];

      // No callback case
      function logDataPreOrder(node) {
        if (!node) {
          return null;
        }
        if (node.left) {
          logDataPreOrder(node.left);
        }

        returnArray.push(node.data);

        if (node.right) {
          logDataPreOrder(node.right);
        }
        return returnArray;
      }

      // Callback case
      function traversePreOrder(node, cb) {
        if (!node) {
          return null;
        }
        if (node.left) {
          traversePreOrder(node.left, cb);
        }

        returnArray.push(cb(node.data));

        if (node.right) {
          traversePreOrder(node.right, cb);
        }
        return returnArray;
      }
      // Main
      if (!callback) {
        return logDataPreOrder(root);
      }
      return traversePreOrder(root, callback);
    },
    // LRD
    postOrder(callback) {
      const returnArray = [];

      // No callback case
      function logDataPostOrder(node) {
        if (!node) {
          return null;
        }
        if (node.left) {
          logDataPostOrder(node.left);
        }
        if (node.right) {
          logDataPostOrder(node.right);
        }
        returnArray.push(node.data);

        return returnArray;
      }

      // Callback case
      function traversePostOrder(node, cb) {
        if (!node) {
          return null;
        }
        if (node.left) {
          traversePostOrder(node.left, cb);
        }
        if (node.right) {
          traversePostOrder(node.right, cb);
        }
        returnArray.push(cb(node.data));

        return returnArray;
      }
      if (!callback) {
        return logDataPostOrder(root);
      }
      return traversePostOrder(root, callback);
    },

    height(node) {
      if (!this.find(node)) {
        return null;
      }

      let maxHeight = 0;
      let height = 0;

      function findHeight(node) {
        if (node.left) {
          height += 1;
          findHeight(node.left);
        }
        if (node.right) {
          height += 1;
          findHeight(node.right);
        }
        maxHeight = Math.max(height, maxHeight);
        height = 0;

        return maxHeight;
      }
      return findHeight(this.find(node));
    },
    depth(node) {
      const searchNode = this.find(node);
      if (!searchNode) {
        return null;
      }

      let depth = 0;

      function findDepth(currentNode) {
        if (searchNode === currentNode) {
          return depth;
        }
        if (searchNode.data < currentNode.data) {
          if (currentNode.left) {
            depth += 1;
            return findDepth(currentNode.left);
          }
        }
        if (searchNode.data > currentNode.data) {
          depth += 1;
          return findDepth(currentNode.right);
        }
      }

      return findDepth(root);
    },

    isBalanced() {
      const checkBalance = (node) => {
        if (!node) {
          return true;
        }

        const leftHeight = this.height(node.left ? node.left.data : null);
        const rightHeight = this.height(node.right ? node.right.data : null);

        if (Math.abs(leftHeight - rightHeight) < 2) {
          return checkBalance(node.left) && checkBalance(node.right);
        }
        return false;
      };
      return checkBalance(root);
    },
    rebalance() {
      if (!this.isBalanced()) {
        root = buildTree(this.preOrder());
        return root;
      }
      return null;
    },

    print() {
      prettyPrint(root);
    },
  };

  return tree;
}

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
