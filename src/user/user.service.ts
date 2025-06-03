// import { HttpException, HttpStatus } from '@nestjs/common'
import { User } from 'src/types/user'

export class UserService {
  private userList = [
    { username: 'test01', email: 'test1@mail.com', password: 'P@ssw0rd' },
    { username: 'test02', email: 'test2@mail.com', password: 'P@ssw0rd' },
    { username: 'test03', email: 'test3@mail.com', password: 'P@ssw0rd' },
  ]

  findOne(email: string): User | undefined {
    const user = this.userList.find((item) => item.email === email)
    if (!user) return undefined
    return user
  }

  create(newUser: User): User {
    this.userList.push(newUser)
    return this.userList[this.userList.length - 1]
  }
}
