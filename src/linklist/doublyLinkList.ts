// 封装链表的节点类
class Node {
  element: any
  next: any
  prev: any

  constructor(element: any) {
    // 保存元素
    this.element = element
    // 指向下一个节点
    this.next = null
    // 指向上一个节点
    this.prev = null
  }
}

// 封装双向链表类
class DoublyLinkList {
  head: any
  tail: any
  length: number
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  // 向链表中添加元素
  append(element: any) {
    const node = new Node(element)
    if (this.length === 0) {
      this.head = this.tail = node
    } else {
      let current = this.head
      while (current.next !== null) {
        current = current.next
      }
      node.prev = current
      current.next = this.tail = node
    }
    this.length++
  }

  // 获取指定位置的元素
  get(position: number) {
    // 数据越界抛出错误
    if (position < 0 || position > this.length - 1) {
      throw new Error('position is error')
    }
    let i = 0
    let current = this.head
    while (i !== position) {
      current = current.next
      i++
    }
    return current
  }

  // 向链表特定位置插入一项
  insert(position: number, element: any) {
    // 数据越界抛出错误
    if (position < 0 || position > this.length) {
      throw new Error('position is error')
    }

    const node = new Node(element)
    if (this.length === 0 && position === 0) {
      // 插入的位置是第一个且链表为空
      this.append(node)
    } else if (this.length !== 0 && position === 0) {
      // 插入的位置是第一个且链表不为空
      node.next = this.head.next
      this.head.prev = this.head = node
    } else if (position === this.length) {
      // 插入的位置是最后一个
      node.prev = this.tail
      this.tail.next = this.tail = node
    } else {
      const frontNode = this.get(position - 1) // 获取前一个节点
      node.next = frontNode.next
      node.prev = frontNode
      frontNode.next.prev = frontNode.next = node
    }

    this.length++
  }
  // 返回元素来列表中的索引 没有则返回-1
  indexOf(element: any) {
    let i = 0
    let current = this.head
    while (i !== this.length) {
      if (current.element === element) {
        return i
      } else {
        current = current.next
        i++
      }
    }
    return -1
  }

  // 修改某个位置的元素
  update(position: number, element: any) {
    const current = this.get(position)
    current.element = element
  }

  // 根据位置移除列表中的某一项
  removeAt(position: number) {
    // 数据越界抛出错误
    if (position < 0 || position > this.length - 1) {
      throw new Error('position is error')
    }
    const current = this.get(position)

    if (position === 0) {
      // 移除头部
      current.next.prev = null
      this.head = current.next
      current.next = null
    } else if (position === this.length - 1) {
      // 移除尾部
      current.prev.next = null
      this.tail = current.prev
      current.prev = null
    } else {
      current.next.prev = current.prev
      current.prev.next = current.next
    }
    this.length--
  }

  // 根据元素移除列表中的某一项
  remove(element: any) {
    // 不存在该元素则抛出错误
    if (this.indexOf(element) === -1) {
      throw new Error('element is not fount')
    }
    // 获取元素位置
    let position = this.indexOf(element)

    this.removeAt(position)
  }

  // 判断链表是否为空
  isEmpty() {
    return this.length === 0 ? true : false
  }

  // 返回链表的元素个数
  size() {
    return this.length
  }
}

const d = new DoublyLinkList()

d.append('a')
d.append('b')
d.append('c')
d.insert(3, 'kkk')
console.log(d.remove('kkk'))
console.log(d)

export {}
