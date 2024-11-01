import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TypeUser } from 'src/utils/user.types';

@Injectable()
export class UsersService {
  private users: TypeUser[] = [
    { id: 1, username: 'John', email: 'john@email.com' },
    { id: 2, username: 'Ann', email: 'ann@email.com' },
  ];

  fetchUsers() {
    return this.users;
  }

  createUser(userDetails: CreateUserDto) {
    const newUser = { id: new Date().getTime(), ...userDetails };
    this.users = [...this.users, newUser];

    return this.fetchUsers();
  }

  fetchUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
