import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { HashService } from 'src/utils/hash/hash.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async register(inputForm: Record<string, string>) {
    const { username, email, password } = inputForm
    const isDuplicatedUser = this.userService.findOne(email)
    if (isDuplicatedUser) {
      const errors = { email: 'This email already in use' }
      throw new HttpException(
        { message: 'The input validation failed', errors },
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await this.hashService.hash(password)

    const newUser = {
      username,
      email,
      password: hashedPassword,
    }

    return this.userService.create(newUser)
  }
}
