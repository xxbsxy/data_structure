// 定义栈需要的方法
interface IStack<T> {
  push(element: T): void
  pop(): T | undefined
  peek(): T
  isEmpty(): boolean
  size(): number
  toString(): string
}

// 封装栈结构 基于数组实现
class Stack<T = any> implements IStack<T> {
  list: T[]

  constructor() {
    this.list = []
  }
  // 向栈顶添加一个元素
  push(element: T) {
    this.list.push(element)
  }

  // 移除栈顶的元素并返回移除的元素
  pop(): T | undefined {
    return this.list.pop()
  }

  // 返回栈顶的元素
  peek(): T {
    return this.list[this.list.length - 1]
  }

  // 判断栈是否为空
  isEmpty(): boolean {
    return this.list.length <= 0 ? true : false
  }

  // 返回栈元素的个数
  size(): number {
    return this.list.length
  }

  // 使栈的数据以字符串形式打印
  toString(): string {
    return this.list.join(' ')
  }
}

// 测试
// 利用栈结构实现十进制转二进制
// function transform(num: number) {
//   while (num >= 1) {
//     stack.push(num % 2)
//     num = Math.floor(num / 2)
//   }
//   let result = ''
//   while (!stack.isEmpty()) {
//     result += stack.pop()
//   }
//   return result
// }

// console.log(transform(100))

function isValid(s: string): boolean {
  const stack = new Stack<string>()
  for (let i = 0; i < s.length; i++) {
    const flag = s[i]

    if (flag === '(') {
      stack.push(')')
    } else if (flag === '{') {
      stack.push('}')
    } else if (flag === '[') {
      stack.push(']')
    } else {
      if (flag !== stack.pop()) return false
    }
  }

  return stack.isEmpty() ? true : false
}

console.log(isValid('({[})[]{}'))

// stack.push(1)
// stack.push(2)
// stack.push({ name: 'aaa' })
// console.log(stack.size())
// console.log(stack.isEmpty())
// console.log(stack.peek())
// stack.pop()
export {}
