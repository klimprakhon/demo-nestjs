import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userInput: Record<string, any>) {
    const newUser = await this.authService.register(userInput)
    return newUser
  }
}
