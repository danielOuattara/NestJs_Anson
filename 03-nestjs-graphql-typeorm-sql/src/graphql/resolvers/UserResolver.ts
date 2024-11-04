import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/UserModel';
import { mockUsers } from 'src/__mocks__/mock-users';

@Resolver()
export class UserResolver {
  @Query(() => UserModel)
  getUser() {
    return { id: 1, username: 'John', displayName: 'John the John' };
  }

  @Query(() => UserModel, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    const user = mockUsers.find((user) => user.id === id);
    return user;
  }

  @Query(() => [UserModel], { nullable: true })
  getUsers() {
    return mockUsers;
  }
}
