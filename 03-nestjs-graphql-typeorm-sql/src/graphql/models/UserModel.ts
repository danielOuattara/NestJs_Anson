import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettingsModel } from './UserSettingsModel';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  settings?: UserSettingsModel;
}
