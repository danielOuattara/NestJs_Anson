# NestJS, GraphQL & TypeORM

Nov 29, 2023

This teaches you how to setup `GraphQL` with `NestJS`, and also
integrate `TypeORM` with `SQL`.

Be sure to check out the link to the code repository and timestamps
to help you pause and follow along throughout this long tutorial!

Code: <https://github.com/stuyy/nestjs-graph>...

Support the Channel:

Become a Member: <https://www.youtube.com/ansonthedevel>...\
Become a Patreon:   / stuyy\
Buy me a Coffee: <http://ko-fi.com/anson>\
Donate on PayPal: <https://paypal.me/ansonfoong>

- [x] **00:00 Intro**
  
- [x] **03:20 Project Setup:**
  
  `nest new 03-nestjs-graphql-typeorm-sql`\
  `npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql`

- [x] **06:36 clean `app.controller.ts` and `app.service.ts`**

- [x] **07:00 Setup GraphQL**

  ```ts
  import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
  import { Module } from '@nestjs/common';
  import { GraphQLModule } from '@nestjs/graphql';

  @Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      }),
  ],
  controllers: [],
  providers: [],
  })
  export class AppModule {}
  ```

- [x] **11:00 Create User Schema:**
  
  using the code first approach strategy create `/src/graphql/models/UserModel.ts` and add its content:

  ```ts
  import { Field, Int, ObjectType } from '@nestjs/graphql';
  @ObjectType()
  export class User {
    @Field((type) => Int)
    id: number;

    @Field()
    username: string;

    @Field({ nullable: true })
    displayName?: string;
  }
  ```

- [x] **15:30 Create User Resolver**
  
  create `/src/graphql/resolvers/UserResolver.ts`

  ```ts
  import { Query, Resolver } from '@nestjs/graphql';
  @Resolver()
  export class UserResolver {}
  ```

- [x] **17:10 Create Query**
  
  create `getUser()` query in `/src/graphql/resolvers/UserResolver.ts`

  ```ts
  import { Query, Resolver } from '@nestjs/graphql';
  @Resolver()
  export class UserResolver {
    @Query(() => UserModel)
    getUser() {
      return { id: 1, username: 'John', displayName: 'John the John' };
    }
  }
  ```

- [x] **19:05 Register `UserResolver` in `app.module.ts`**

  ```ts
  import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
  import { Module } from '@nestjs/common';
  import { GraphQLModule } from '@nestjs/graphql';
  import { UserResolver } from './graphql/resolvers/UserResolver';

  @Module({
    imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
      }),
    ],
    controllers: [],
    providers: [UserResolver],
  })
  export class AppModule {}
  ```

- [x] **20:00 Add Auto Schema File**
  
  ```ts
  import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
  import { Module } from '@nestjs/common';
  import { GraphQLModule } from '@nestjs/graphql';
  import { UserResolver } from './graphql/resolvers/UserResolver';

  @Module({
    imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: 'src/schema.gql', // New
      }),
    ],
    controllers: [],
    providers: [UserResolver],
  })
  export class AppModule {}
  ```

- [x] **21:10 GraphQL Playground**
  
   `http://localhost:3000/graphql?`

  ```gql
  query{
    getUser{
      id
      username
      displayName
    }
  }
  ```

- [x] **23:45 Add mock data**

   add `mock-user` data at `/src/__mocks__/mock-users.ts`

  ```ts
  export const mockUsers = [
    { id: 1, username: 'John', displayName: 'John Doe' },
    { id: 2, username: 'Ann', displayName: 'Ann Waters' },
    { id: 3, username: 'Mike', displayName: 'Mike Tyson' },
  ];
  ```

- [x] **24:17 Query arguments: creating new queries**
  
  add `getUserById()` query to `/src/graphql/resolvers/UserResolver.ts`

  ```ts
  import { Args, Int, Query, Resolver } from '@nestjs/graphql';
  import { UserModel } from '../models/UserModel';
  import { mockUsers } from 'src/__mocks__/mock-users';

  @Resolver()
  export class UserResolver {
    @Query(() => UserModel)
    getUser() {
      return { id: 1, username: 'John', displayName: 'John the John' };
    }

    @Query((returns) => UserModel, { nullable: true })
    getUserById(@Args('id', { type: () => Int }) id: number) {
      const user = mockUsers.find((user) => user.id === id);
      return user;
    }

    @Query((returns) => [UserModel], { nullable: true })
    getUsers() {
      return mockUsers;
    }
  }
  ```

- [x] **27:00 Query argument: testing new queries**
  
  ```gql
  query{
    getUser{
      id 
      username 
      displayName
    }
    
    userById(id: 1) {
      id
      username
      displayName
    }
    
    getUsers{
      id 
      username 
      displayName
    }
  }
  ```

  - [x] **29:28 Query arguments: naming new queries**
  
  ```ts
  import { Args, Int, Query, Resolver } from '@nestjs/graphql';
  import { UserModel } from '../models/UserModel';
  import { mockUsers } from 'src/**mocks**/mock-users';

  @Resolver()
  export class UserResolver {
    @Query(() => UserModel)
    getUser() {
      return { id: 1, username: 'John', displayName: 'John the John' };
    }

    @Query(() => UserModel, { nullable: true, name: 'userById' // new ! })
    getUserById(@Args('id', { type: () => Int }) id: number) {
      const user = mockUsers.find((user) => user.id === id);
      return user;
    }

    @Query(() => [UserModel], { nullable: true })
    getUsers() {
      return mockUsers;
    }
  }
  ```
  
- [ ] **34:00 UserSetting Schema**

  About more complex types than `number` or `string`

  create `/src/graphql/models/UserSettingsModel.ts` and add few fields there

  ```ts
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

  ```

  link `UserSettingsModel` to `/src/graphql/models/UserModel.ts`

  ```ts
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

    @Field({ nullable: true }) // new !
    settings?: UserSettingsModel;
  }
  ```

- [x] **40:00 GraphQL Playground**

  Testing user setting

  ```gql
  query{
    getUser{
      id 
      username 
      displayName
      settings {
        userId
        receivedNotification
        receivedEmails
      }
    }
    
    userById(id: 1) {
      id
      username
      displayName
      settings {
        userId
        receivedNotification
        receivedEmails
      }
    }
    
    getUsers{
      id 
      username 
      displayName
      settings {
        userId
        receivedNotification
        receivedEmails
      }
    }
  }
  ```

- [x] **42:00 add user settings mock data**
  
  To resolve the user `settings` field from `UserSettingsModel`

  add `/src/__mocks__/mock-users-settings.ts`

  ```ts
    export const mockUsersSettings = [
      { userId: 1, receivedNotification: false, receivedEmails: true },
      //   { userId: 2, receivedNotification: true, receivedEmails: true },
      { userId: 3, receivedNotification: false, receivedEmails: true },
    ];
  ```

- [ ] 42:00 Resolving Fields
- [ ] 1:00:14 Mutations
- [ ] 1:09:00 InputTypes
- [ ] 1:23:20 Setting up TypeORM & SQL
