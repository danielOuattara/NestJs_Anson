import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserModel } from '../models/UserModel';
import { mockUsers } from 'src/__mocks__/mock-users';
import { UserSettingsModel } from '../models/UserSettingsModel';
import { mockUsersSettings } from 'src/__mocks__/mock-users-settings';

@Resolver(() => UserModel)
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

  // caution: logic duplicated with `settings` fields
  @ResolveField(() => UserSettingsModel, {
    name: 'settings', // use this to avoid duplicated logic
    nullable: true,
  })
  getUserSettings(@Parent() user: UserModel) {
    console.log(user);
    return mockUsersSettings.find((setting) => setting.userId === user.id);
  }
}
