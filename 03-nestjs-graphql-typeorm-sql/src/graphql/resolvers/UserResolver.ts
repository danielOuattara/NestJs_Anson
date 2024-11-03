import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => UserResolver)
  getUser() {
    return { id: 1, username: 'John', displayName: 'John the John' };
  }
}
