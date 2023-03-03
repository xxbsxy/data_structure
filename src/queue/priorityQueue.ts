// interface IQueue<T> {
//   enqueue(element: T): void
//   dequeue(): T | undefined
//   front(): T
//   isEmpty(): boolean
//   size(): number
// }

// 封装优先级队列的元素对象
class QueueElement<T = any> {
  element: T
  priority: number
  constructor(element: T, priority: number) {
    this.element = element
    this.priority = priority
  }
}

// interface IList<T= any> {
//   element: any
//   priority: number
// }
// 封装优先级队列
class priorityQueue {
  list: QueueElement[]
  length: number
  constructor() {
    this.list = []
    this.length = 0
  }
  // 队列尾部添加一项 优先级小的在前面
  enqueue(element: any, priority: number) {
    // 获取需要插入的对象元素
    const queueElement = new QueueElement(element, priority)
    if (this.isEmpty()) {
      // 队列为空则直接插入
      this.list.push(queueElement)
    } else if (queueElement.priority > this.list[this.length - 1].priority) {
      // 比队列的最后优先级大则直接插入到最后
      this.list.splice(this.length, 0, queueElement)
    } else {
      for (let i = 0; i < this.length; i++) {
        if (queueElement.priority < this.list[i].priority) {
          this.list.splice(i, 0, queueElement)
          break
        }
      }
    }
    this.length++
  }

  // 移除队列的第一个元素并返回
  dequeue() {
    if (this.length <= 0) throw new Error('stack is empty')
    this.length--
    return this.list.shift()
  }
  // 返回队列最先被添加的元素
  front() {
    if (this.isEmpty()) return null
    return this.list[0]
  }
  // 判断队列是否为空
  isEmpty() {
    return this.length <= 0 ? true : false
  }
  // 返回队列元素的个数
  size() {
    return this.length
  }
}

const q = new priorityQueue()

q.enqueue('a', 8)
q.enqueue('b', 3)
q.enqueue('c', 1)
q.enqueue('d', 100)
q.enqueue('e', 2)
q.enqueue('z', 2)

q.enqueue('f', 106)

console.log(q.list)
export {}
