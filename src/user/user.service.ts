import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { Console, Command } from 'nestjs-console';

@Injectable()
@Console({
  command: 'users',
})
export class UserService {
  filter(user: User): RegisterUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const user = new User();
    user.email = newUser.email;
    user.pwdHash = hashPwd(newUser.pwd);
    await user.save();

    return this.filter(user);
  }

  async getOneUser(id: string): Promise<User> {
    return await User.findOne({ where: { id } });
  }

  @Command({
    command: 'list',
    description: 'List all of the users',
  })
  async listUsersCMD() {
    console.log((await User.find()).map(this.filter));
  }

  @Command({
    command: 'add <email> <pwd>',
    description: 'Add new user',
  })
  async addUsersCmd(email: string, pwd: string) {
    console.log(
      await this.register({
        email,
        pwd,
      }),
    );
  }
}
