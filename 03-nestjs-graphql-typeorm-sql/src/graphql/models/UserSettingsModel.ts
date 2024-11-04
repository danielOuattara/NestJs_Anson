import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSettingsModel {
  @Field((type) => Int)
  userId: number;

  @Field({ defaultValue: false })
  receivedNotification: boolean;

  @Field({ defaultValue: false })
  receivedEmails: boolean;
}
