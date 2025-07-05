import { Injectable } from '@nestjs/common'
import { Todo } from 'src/types/todo'
import { UpdateTodoDto } from './dto/update-todo-dto'
import { TodoQueryDto } from './dto/todo-query-dto'

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
  ]

  findAll(query: TodoQueryDto) {
    const { completed } = query

    let filtered = this.todos

    if (completed !== undefined) {
      const isDone = completed === 'true'
      filtered = filtered.filter((todo) => todo.completed === isDone)
    }

    return filtered
  }

  findOne(id: number): Todo | undefined {
    const index = id - 1
    const todo = this.todos[index]
    if (!todo) return undefined
    return todo
  }

  create(title: string) {
    const latestId = this.todos.length + 1
    const newTodo: Todo = {
      id: latestId,
      title: title,
      completed: false,
    }

    this.todos.push(newTodo)
    return this.todos[this.todos.length - 1]
  }

  update(todoId: number, updateTodo: UpdateTodoDto) {
    const todoIndex = this.todos.findIndex((item) => item.id === todoId)
    if (todoIndex === -1) return undefined

    const updatedTodo = { ...this.todos[todoIndex], ...updateTodo }
    this.todos[todoIndex] = updatedTodo

    return updatedTodo
  }

  delete(id: number) {
    console.log('id', id)
    this.todos = this.todos.filter((item) => item.id !== id)
    console.log('after', this.todos)
    return this.todos
  }
}
