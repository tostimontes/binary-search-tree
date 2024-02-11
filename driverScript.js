const { createNewTree, prettyPrint } = require('./treeFactory');

function generateRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function printTreeElements(tree) {
  console.log('Level order:', tree.levelOrder());
  console.log('Pre-order:', tree.preOrder());
  console.log('Post-order:', tree.postOrder());
  console.log('In-order:', tree.inOrder());
}

// Driver script
function main() {
  const randomNumbers = generateRandomArray(10, 100);
  const tree = createNewTree(randomNumbers);

  console.log('Tree created with random numbers:', randomNumbers);
  console.log('Is the tree balanced?', tree.isBalanced());

  printTreeElements(tree);

  // Unbalance the tree
  [101, 102, 103, 104, 105].forEach((num) => tree.insert(num));
  console.log('Added numbers greater than 100 to unbalance the tree.');

  console.log('Is the tree unbalanced now?', tree.isBalanced());

  // Rebalance the tree
  tree.rebalance();
  console.log('Tree rebalanced.');

  console.log('Is the tree balanced after rebalancing?', tree.isBalanced());

  printTreeElements(tree);
}

main();
