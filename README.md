# Balanced Binary Search Tree

## Overview

This project is part of The Odin Project's JavaScript curriculum. It involves the implementation of a Balanced Binary Search Tree (BST) using JavaScript. The BST is a fundamental data structure in computer science, used for efficient data storage and retrieval. This particular implementation includes various methods to interact with the tree, providing a comprehensive understanding of BST operations.

## Features

### Node Factory

The `createNewNode` function is a factory for creating nodes of the tree. Each node has a `data` attribute, as well as `left` and `right` attributes pointing to its child nodes.

```javascript
module.exports.createNewNode = function createNewNode(data = null, left = null, right = null) {
  return { data, left, right };
};
```

### Tree Factory

The `createNewTree` function initializes a new binary search tree from an array. The array is first sorted and filtered for duplicates before building the tree.

#### Methods
- `insert(value)`: Inserts a new value into the tree.
- `delete(value)`: Deletes a value from the tree.
- `find(value)`: Searches for a value in the tree and returns the corresponding node.
- `levelOrder(callback)`: Traverses the tree in level-order and applies a callback function to each node.
- `inOrder(callback)`, `preOrder(callback)`, `postOrder(callback)`: Traversal methods that apply a callback function to each node in in-order, pre-order, and post-order traversal, respectively. If no callback is provided, returns an array of the values in the order they are traversed.
- `height(node)`: Calculates the height of a given node.
- `depth(node)`: Calculates the depth of a given node in the tree.
- `isBalanced()`: Checks if the tree is balanced.
- `rebalance()`: Rebalances the tree if it is unbalanced.
- `print()`: Prints a visual representation of the tree.

### Usage

#### Initializing the Tree
```javascript
const tree = createNewTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
```

#### Using Tree Methods
```javascript
const tree = createNewTree([1, 7, 4, 23, 8, 9, 3, 5, 67, 6345, 324]);
tree.print(); 
//     ┌── 6345
// ┌── 324
// │   └── 67
// │       └── 23
// 9
// │       ┌── 8
// │   ┌── 7
// │   │   └── 5
// └── 4
//     └── 3
//         └── 1

tree.insert(10); // Inserts a new value into the tree
tree.print(); 
//     ┌── 6345
// ┌── 324
// │   └── 67
// │       └── 23
// 9
// │       ┌── 10
// │   ┌── 8
// │   │   └── 7
// │   │       └── 5
// └── 4
//     └── 3
//         └── 1

tree.delete(9); // Deletes a node with two children
tree.print(); 
//     ┌── 6345
// ┌── 324
// │   └── 67
// │       └── 23
// 10
// │   ┌── 8
// │   │   └── 7
// │   │       └── 5
// └── 4
//     └── 3
//         └── 1
const levelOrderValues = tree.levelOrder();
console.log('Level order traversal:', levelOrderValues);
// Expected Output: 
// Level order traversal: [values in level order]
// For example, output for the initial tree: [4, 3, 9, 1, 7, 23, 5, 8, 67, 324, 6345]

function multiplyByTwo(node) {
  return node.data * 2;
}
const preOrderValues = tree.preOrder(multiplyByTwo);
console.log('Pre-order traversal with values multiplied by 2:', preOrderValues);
// Expected Output:
// Pre-order traversal with values multiplied by 2: [values in pre-order, each multiplied by 2]
// For example, output for the initial tree: [8, 6, 2, 14, 10, 18, 16, 46, 134, 648, 12690]

```
