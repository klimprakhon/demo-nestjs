import { Injectable } from '@nestjs/common'

@Injectable()
export class TodosService {
  private todos = [
    { id: 1, title: 'Todo 1' },
    { id: 2, title: 'Todo 2' },
  ]
  findAll() {
    return this.todos
  }

  findOne(id: number) {
    const index = id - 1
    return this.todos[index]
      ? this.todos[index]
      : { id: 0, title: 'Error not found' }
  }

  create(title: string) {
    const latestId = this.todos.length + 1
    const newTodo = {
      id: latestId,
      title: title,
    }

    this.todos.push(newTodo)

    return this.todos[-1]
  }

  delete(id: number) {
    const index = id
    this.todos.splice(index, 1)

    return this.todos
  }
}
