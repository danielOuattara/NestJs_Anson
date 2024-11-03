import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/UserModel';

@Resolver()
export class UserResolver {
  @Query((returns) => UserModel)
  getUser() {
    return { id: 1, username: 'John', displayName: 'John the John' };
  }
}
