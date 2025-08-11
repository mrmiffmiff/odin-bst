class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const sortedArray = array.toSorted((a, b) => a - b);
        const uniqueArray = [... new Set(sortedArray)];
        this.root = Tree.buildTree(uniqueArray);
    }

    static buildTree(array) {
        function recursiveTreeCreation(array, start, end) {
            if (start > end) return null;

            let mid = start + Math.floor((end - start) / 2);

            let root = new Node(array[mid]);
            root.left = recursiveTreeCreation(array, start, mid - 1);
            root.right = recursiveTreeCreation(array, mid + 1, end);

            return root;
        }

        return recursiveTreeCreation(array, 0, array.length - 1);
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    insert(value, node = this.root) {
        if (node === null) {
            return new Node(value);
        }

        if (node.data === value) return node;

        if (value < node.data) node.left = this.insert(value, node.left);
        else node.right = this.insert(value, node.right);

        return node;
    }

    delete(value, node = this.root) {
        if (node === null) return node;

        if (value < node.data) node.left = this.delete(value, node.left);
        else if (value > node.data) node.right = this.delete(value, node.right);
        else {
            if (node.left === null) {
                node = node.right;
                return node;
            }

            if (node.right === null) {
                node = node.left;
                return node;
            }

            function inOrderSuccessor(curr) {
                curr = curr.right;
                while (curr !== null && curr.left !== null) curr = curr.left;
                return curr;
            }

            let successor = inOrderSuccessor(node);
            node.data = successor.data;
            node.right = this.delete(successor.data, node.right);
        }

        return node;
    }

    find(value, node = this.root) {
        if (!node) return null;
        if (node.data === value) return node;
        else if (value < node.data) return this.find(value, node.left);
        else if (value > node.data) return this.find(value, node.right);
        else return null;
    }

    levelOrderForEach(callback) {
        if (!callback || typeof (callback) !== 'function') {
            throw new Error("Please provide a callback function");
        }

        let queue = [this.root];
        while (queue.length > 0) {
            let curr = queue.shift();
            callback(curr);
            if (curr.left) queue.push(curr.left);
            if (curr.right) queue.push(curr.right);
        }
    }

    inOrderForEach(callback) {
        if (!callback || typeof (callback) !== 'function') {
            throw new Error("Please provide a callback function");
        }

        function traverseAndExecute(node) {
            if (node.left) traverseAndExecute(node.left);
            callback(node);
            if (node.right) traverseAndExecute(node.right);
        }

        traverseAndExecute(this.root);
    }

    preOrderForEach(callback) {
        if (!callback || typeof (callback) !== 'function') {
            throw new Error("Please provide a callback function");
        }

        function traverseAndExecute(node) {
            callback(node);
            if (node.left) traverseAndExecute(node.left);
            if (node.right) traverseAndExecute(node.right);
        }

        traverseAndExecute(this.root);
    }

    postOrderForEach(callback) {
        if (!callback || typeof (callback) !== 'function') {
            throw new Error("Please provide a callback function");
        }

        function traverseAndExecute(node) {
            if (node.left) traverseAndExecute(node.left);
            if (node.right) traverseAndExecute(node.right);
            callback(node);
        }

        traverseAndExecute(this.root);
    }

    height(value, curr = this.root) {
        if (!curr) return null;
        if (value < curr.data) return this.height(value, curr.left);
        else if (value > curr.data) return this.height(value, curr.right);
        else {
            function countToLowestLeaf(count, node) {
                if (!node.left && !node.right) return count;
                if (!node.left) return countToLowestLeaf(count + 1, node.right);
                if (!node.right) return countToLowestLeaf(count + 1, node.left);
                return Math.max(countToLowestLeaf(count + 1, node.left), countToLowestLeaf(count + 1, node.right));
            }
            return countToLowestLeaf(0, curr);
        }
    }

    depth(value, curr = this.root, count = 0) {
        if (!curr) return null;
        if (value < curr.data) return this.depth(value, curr.left, count + 1);
        else if (value > curr.data) return this.depth(value, curr.right, count + 1);
        else return count;
    }

    isBalanced(curr = this.root) {
        if (!curr) return true;
        let leftHeight = (curr.left) ? this.height(curr.left.data) : 0;
        let rightHeight = (curr.right) ? this.height(curr.right.data) : 0;
        if (Math.abs(leftHeight - rightHeight) > 1) return false;
        if (!this.isBalanced(curr.left) || !this.isBalanced(curr.right)) return false;
        return true;
    }

    rebalance() {
        let newArray = [];
        function inOrderArrayAdd(node) {
            if (node.left) inOrderArrayAdd(node.left);
            newArray.push(node.data);
            if (node.right) inOrderArrayAdd(node.right);
        }
        inOrderArrayAdd(this.root);
        this.root = this.constructor.buildTree(newArray);
    }

}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.prettyPrint();
console.log(test.isBalanced());
test.insert(5);
test.insert(6);
test.insert(21);
test.insert(40);
test.insert(41);
test.prettyPrint();
console.log(test.isBalanced());
test.rebalance();
test.prettyPrint();
console.log(test.isBalanced());
// console.log(test.height(2));
// console.log(test.height(3));
// console.log(test.height(1));
// console.log(test.height(4));
// console.log(test.height(8));
// console.log(test.depth(2));
// console.log(test.depth(3));
// console.log(test.depth(1));
// console.log(test.depth(4));
// console.log(test.depth(8));
// console.log(test.depth(41));
// test.delete(8);
// test.delete(1);
// test.delete(6);
// console.log(test.find(3));
// console.log(test.find(9));
// console.log(test.find(324));
// console.log(test.find(6));
// test.prettyPrint();
// try {
//     test.levelOrderForEach(3);
// } catch (e) { console.log(e); }
// try {
//     test.levelOrderForEach((node) => {
//         node.data *= 2;
//     });
// } catch (e) { console.log(e); }
// test.prettyPrint();
// test.inOrderForEach((node) => {
//     node.data /= 2;
// });
// test.prettyPrint();
// test.preOrderForEach((node) => {
//     node.data *= 2;
// });
// test.prettyPrint();
// test.postOrderForEach((node) => {
//     node.data /= 2;
// });