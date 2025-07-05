// import { HttpException, HttpStatus } from '@nestjs/common'
import { User } from 'src/types/user'

export class UserService {
  private userList = [
    {
      id: '000001',
      username: 'test01',
      email: 'test1@mail.com',
      password: 'P@ssw0rd',
    },
    {
      id: '000002',
      username: 'test02',
      email: 'test2@mail.com',
      password: 'P@ssw0rd',
    },
    {
      id: '000003',
      username: 'test03',
      email: 'test3@mail.com',
      password: 'P@ssw0rd',
    },
  ]

  getUserByEmail(email: string): User | undefined {
    const user = this.userList.find((u) => u.email === email)
    if (!user) return undefined
    return user
  }

  getUserById(id: string): User | undefined {
    const user = this.userList.find((u) => u.id === id)
    if (!user) return undefined
    return user
  }

  getRunningUserId(): string {
    const latestUser = this.userList[-1]
    const latestUserId = parseFloat(latestUser.id.replaceAll('0', ''))
    const newId = latestUserId + 1
    let newUserId = newId.toString()

    if (newUserId.length !== 6) {
      const numberOfZero = '0'.repeat(6 - newUserId.length)
      newUserId = numberOfZero.concat(newUserId)
    }

    return newUserId
  }

  create(newUser: User): User {
    this.userList.push(newUser)
    return this.userList[this.userList.length - 1]
  }
}
