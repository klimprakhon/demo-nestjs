import { ApiProperty } from '@nestjs/swagger'

export class UpdateTodoDto {
  @ApiProperty({ example: 'Learn Swagger' })
  title?: string

  @ApiProperty({ example: true })
  completed?: boolean
}
