import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSettingsModel {
  @Field((type) => Int)
  userId: number;

  @Field({ defaultValue: false })
  receiveNotification: boolean;

  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
