import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'
import { AuthController } from './auth.controller'
import { UtilsModule } from 'src/utils/utils.module'

@Module({
  imports: [UserModule, UtilsModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
