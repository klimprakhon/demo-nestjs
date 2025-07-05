import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { Todo } from 'src/types/todo'
import { ApiBody } from '@nestjs/swagger'
import { CreateTodoDto } from './dto/create-todo-dto'
import { UpdateTodoDto } from './dto/update-todo-dto'
import { TodoQueryDto } from './dto/todo-query-dto'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Query() query: TodoQueryDto): Todo[] {
    return this.todoService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    const result = this.todoService.findOne(id)
    if (!result) {
      throw new NotFoundException(`Todo with id ${id} not found`)
    }
    return result
  }

  @Post()
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    const newTodoTitle = createTodoDto.title
    const result = this.todoService.create(newTodoTitle)
    if (!result) {
      throw new HttpException(
        'Create new Todo failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    return result
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTodoDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodo: UpdateTodoDto,
  ): Todo {
    const updatedTodo = this.todoService.update(id, updateTodo)
    if (!updatedTodo) {
      throw new HttpException(
        'Update Todo info failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    return updatedTodo
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    const result = this.todoService.delete(id)
    if (!result)
      throw new HttpException(
        'Delete not success',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )

    return HttpStatus.ACCEPTED
  }
}
