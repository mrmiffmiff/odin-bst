class Node {
    constructor(value) {
        this.val = value;
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

    prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
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

}