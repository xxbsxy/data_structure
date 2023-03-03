interface IQueue<T> {
  enqueue(element: T): void
  dequeue(): T | undefined
  front(): T
  isEmpty(): boolean
  size(): number
}

// 封装队列结构 基于数组实现
export default class Queue<T = any> implements IQueue<T> {
  list: T[] = []

  // 队列尾部添加一项
  enqueue(element: T) {
    this.list.push(element)
  }

  // 移除队列的第一个元素并返回
  dequeue(): T | undefined {
    return this.list.shift()
  }

  // 返回队列最先被添加的元素
  front(): T {
    return this.list[0]
  }

  // 判断队列是否为空
  isEmpty(): boolean {
    return this.list.length <= 0 ? true : false
  }

  // 返回队列元素的个数
  size(): number {
    return this.list.length
  }
}
const queue = new Queue<number>()

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue.front())
console.log(queue.size())
console.log(queue.isEmpty())
console.log(queue.front())
