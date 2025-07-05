import { ApiPropertyOptional } from '@nestjs/swagger'

export class TodoQueryDto {
  @ApiPropertyOptional({
    example: 'true',
    description: 'Filter by completed status',
  })
  completed?: string
}
