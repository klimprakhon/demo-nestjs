import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoDto {
  @ApiProperty({ example: 'Learn Nest.js' })
  title: string

  @ApiProperty({ example: false, required: false })
  completed?: boolean
}
