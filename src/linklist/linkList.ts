// 封装链表的节点类
class Node {
  element: any
  next: any
  constructor(element: any) {
    // 保存元素
    this.element = element
    // 指向下一个节点
    this.next = null
  }
}

// 封装单向链表类
class LinkList {
  head: any
  length: number
  constructor() {
    this.head = null
    this.length = 0
  }

  // 向链表中添加元素
  append(element: any) {
    const node = new Node(element)
    if (this.head === null) {
      // 链表为空
      this.head = node
    } else {
      // 链表不为空
      let current = this.head
      while (current.next !== null) {
        current = current.next
      }
      current.next = node
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
    if (position === 0 && this.length !== 0) {
      // 如果插入是第0个位置并且链表中有元素
      const firstNode = this.head
      this.head = node
      node.next = firstNode
    } else if (position === 0 && this.length === 0) {
      // 如果插入是第0个位置并且链表中没有元素
      this.append(node)
    } else {
      let current = this.get(position - 1) //获取指定位置的前一个元素
      node.next = current.next
      current.next = node
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

  //修改某个位置的元素
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

    if (position === 0) {
      this.head = this.head.next
    } else {
      let frontNode = this.get(position - 1) //获取指定位置的前一个元素
      frontNode.next = frontNode.next.next
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

const l = new LinkList()
// debugger
l.append('2')
l.append('4')
l.append('3')
// l.removeAt(3)
// l.update(2, 'bbb')
// console.log(l.get(1))
console.log(l)
// console.log(l.indexOf('3'))
// console.log(l.indexOf('aaa'))
// console.log(l.indexOf('bbb'))

export {}
