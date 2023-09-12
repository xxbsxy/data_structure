class Node<T> {
	value: T;
	constructor(element: any) {
		this.value = element;
	}
}

class TreeNode<T> extends Node<T>  {
	left: TreeNode<T> | null = null
	right: TreeNode<T> | null = null
}

class BSTree<T> {
	private root: TreeNode<T> | null = null

	insert(number: T) {
		// 1. 创建节点
		const newNode = new TreeNode<T>(number)
		if (!this.root) {
			// 节点为空第一个元素就为根节点
			this.root = newNode
		} else {
			// 根节点已经有值
			this.insertNode(this.root, newNode)
		}
	}

	private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
		if (node.value > newNode.value) { // 插入的值比根节点的值小
			if (node.left === null) {
				node.left = newNode
			} else {
				// 递归继续和左节点比较直到找到一个空节点进行插入
				this.insertNode(node.left, newNode)
			}
		} else {
			if (node.right === null) { // 插入的值比根节点的值大
				node.right = newNode
			} else {
				// 递归继续和右节点比较直到找到一个空节点进行插入
				this.insertNode(node.right, newNode)
			}
		}
	}
	// 先序遍历
	preOrderTraverse() {
		this.PreOrderTraverseNode(this.root)
	}

	PreOrderTraverseNode(node: TreeNode<T> | null) {
		if (node) {
			console.log(node);
			this.PreOrderTraverseNode(node.left)
			this.PreOrderTraverseNode(node.right)
		}
	}

	// 中序遍历
	inOrderTraverse() {
		this.PreOrderTraverseNode(this.root)
	}

	inOrderTraverseNode1(node: TreeNode<T> | null) {
		if (node) {
			this.PreOrderTraverseNode(node.left)
			console.log(node);
			this.PreOrderTraverseNode(node.right)
		}
	}

	// 后序遍历
	postOrderTraverse() {
		this.PreOrderTraverseNode(this.root)
	}

	postOrderTraverseNode(node: TreeNode<T> | null) {
		if (node) {
			this.PreOrderTraverseNode(node.left)
			this.PreOrderTraverseNode(node.right)
			console.log(node);
		}
	}

	// 层序遍历
	leaverOrderTraverse() {
		if (!this.root) return
		// 数组模拟队列
		const queue: TreeNode<T>[] = []
		queue.unshift(this.root)

		while (queue.length !== 0) {
			const node = queue.pop()
			console.log(node?.value);

			if (node?.left) {
				queue.unshift(node!.left)
			}
			if (node?.right) {
				queue.unshift(node!.right)
			}
		}
	}

	// 获取最大值
	getMaxValue(): T | null {
		if (!this.root) return null
		let maxNode = this.root
		while (maxNode?.right !== null) {

			maxNode = maxNode!.right
		}
		return maxNode.value
	}

	// 获取最小值
	getMinValue(): T | null {
		if (!this.root) return null
		let maxNode = this.root
		while (maxNode?.left !== null) {

			maxNode = maxNode!.left
		}
		return maxNode.value
	}
	// 查找树中是否有指定节点
	search(value: T): boolean {
		let current = this.root
		while (current) {
			if (current.value === value) return true
			if (current.value > value) {
				current = current.left
			} else {
				current = current.right
			}
		}
		return false
	}

	// 根据value获取指定的节点 父节点等信息
	searchNode(value: T) {
		let current = this.root
		let parent: TreeNode<T> | null = null
		let flag: 'left' | 'right' = 'left'
		while (current) {
			if (current.value === value) return { current, parent, flag }
			parent = current
			if (current.value > value) {
				current = current.left
				flag = 'left'
			} else {
				current = current.right
				flag = 'right'
			}
		}
		return null
	}

	// 获得后继节点 就是右子树中最小的节点
	private getSuccessor(delNode: TreeNode<T>) {
		// 右子树
		let current = delNode.right
		// 后继节点
		let successor: TreeNode<T> | null = null

		while (current) {
			successor = current
			current = current.left
		}

		// 将删除节点的left赋值给后继节点的left
		successor!.left = delNode.left

		// 删除节点的右节点不是后继节点
		if(successor !== delNode.right) {
			// 后继节点还有右节点 需要将后继节点的右节点赋值给后继节点父节点的左节点
			const {parent} = this.searchNode(successor!.value)!
			parent!.left = successor!.right

			successor!.right = delNode.right
		}

		return successor!
	}

	// 删除节点
	delete(value: T) {
		// 树中不存在删除的节点
		if (!this.search(value)) return

		// 获取删除的节点 父节点 以及左或者右节点
		const { current: deleteNode, parent: deleteParentNode, flag } = this.searchNode(value)!

		// 如果删除的节点是叶子节点
		if (!deleteNode.left && !deleteNode.right) {
			// 删除的节点为根节点
			if (deleteNode === this.root) {
				this.root = null
			} else {
				deleteParentNode![flag] = null
			}
		}

		// 删除的节点只有一个节点 只有左子节点
		else if (deleteNode.right === null) {
			if (deleteNode === this.root) {
				// 删除的节点为根节点
				this.root = deleteNode.left
			} else {
				deleteParentNode![flag] = deleteNode.left
			}
		}

		// 删除的节点只有一个节点 只有右子节点
		else if (deleteNode.left === null) {
			if (deleteNode === this.root) {
				// 删除的节点为根节点
				this.root = deleteNode.right
			} else {
				deleteParentNode![flag] = deleteNode.right
			}
		}

		// 删除的节点有两个子节点
		else {
			// 获取后继节点
			const successor = this.getSuccessor(deleteNode)
			if (deleteNode === this.root) {
				// 删除的节点为根节点
				this.root = successor
			} else if (flag === 'left') {
				// 删除的节点为左节点
				deleteParentNode!.left = successor
			} else {
				// 删除的节点为右节点
				deleteParentNode!.right = successor
			}
		}
	}
}


const bs = new BSTree<number>()

bs.insert(10)
bs.insert(8)
// bs.insert(6)
bs.insert(9)

bs.insert(20)
bs.insert(13)
bs.insert(21)

bs.delete(20)
// bs.delete(9)

console.log(bs)


export { }