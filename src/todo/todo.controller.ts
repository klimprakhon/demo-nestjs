import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { TodoService } from './todo.service'
import { Todo } from 'src/types/todo'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll()
  }

  @Get(':id')
  findOne(@Param() params: Record<string, any>): Todo {
    const id = parseInt(params.id as string)
    return this.todoService.findOne(id)
  }

  @Post()
  create(@Body() body: Record<string, any>): Todo {
    const newTodoTitle = body.title as string
    return this.todoService.create(newTodoTitle)
  }

  @Delete(':id')
  delete(@Param() params: Record<string, any>) {
    const id = parseInt(params.id as string)
    return this.todoService.delete(id)
  }
}
