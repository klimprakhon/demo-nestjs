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
    const isDuplicatedUser = this.userService.getUserByEmail(email)
    if (isDuplicatedUser) {
      const errors = { email: 'This email already in use' }
      throw new HttpException(
        { message: 'The input validation failed', errors },
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await this.hashService.hash(password)

    const newUser = {
      id: this.userService.getRunningUserId(),
      username,
      email,
      password: hashedPassword,
    }

    return this.userService.create(newUser)
  }
}
