import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from 'src/types/user'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const result = this.userService.getUserById(id)
    if (!result) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return result
  }
}
