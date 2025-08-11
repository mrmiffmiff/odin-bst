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

}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.insert(5);
test.insert(6);
test.insert(21);
test.insert(40);
test.delete(8);
test.delete(1);
test.delete(6);
test.prettyPrint();