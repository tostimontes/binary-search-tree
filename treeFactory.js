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
      const start = 0;
      const end = arr.length - 1;
      if (start >= end) {
        return createNewNode(arr[start]);
      }

      const newRootIndex = Math.floor(arr.length / 2);
      const newRoot = arr[newRootIndex];
      const leftHalf = arr.slice(start, newRootIndex);
      const rightHalf = arr.slice(newRootIndex + 1);

      return createNewNode(
        newRoot,
        attachNodes(leftHalf),
        attachNodes(rightHalf)
      );
    }

    return attachNodes(sortedArray);
  }

  return { root };
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const empty = []

const tree = createNewTree(empty);

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

prettyPrint(tree.root);
console.log(tree.root);
