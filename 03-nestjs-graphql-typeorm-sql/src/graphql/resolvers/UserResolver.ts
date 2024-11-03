import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/UserModel';
import { mockUsers } from 'src/__mocks__/mock-users';

@Resolver()
export class UserResolver {
  @Query((returns) => UserModel)
  getUser() {
    return { id: 1, username: 'John', displayName: 'John the John' };
  }

  @Query((returns) => UserModel, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    const user = mockUsers.find((user) => user.id === id);
    return user;
  }

  @Query((returns) => [UserModel], { nullable: true })
  getUsers() {
    return mockUsers;
  }
}
