import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { TodosService } from './todos.service'
import { Todo } from 'src/types/todos'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll()
  }

  @Get(':id')
  findOne(@Param() params: Record<string, any>): Todo {
    const id = parseInt(params.id as string)
    return this.todosService.findOne(id)
  }

  @Post()
  create(@Body() body: Record<string, any>): Todo {
    const newTodoTitle = body.title as string
    return this.todosService.create(newTodoTitle)
  }

  @Delete(':id')
  delete(@Param() params: Record<string, any>) {
    const id = parseInt(params.id as string)
    return this.todosService.delete(id)
  }
}
