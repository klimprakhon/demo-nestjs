import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
  private readonly saltRounds = 12

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds)
  }

  async compare(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed)
  }
}
