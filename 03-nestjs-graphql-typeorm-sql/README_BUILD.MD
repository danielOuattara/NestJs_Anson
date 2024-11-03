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

- [x] 00:00 Intro
- [x] 03:20 Project Setup:\
  `nest new 03-nestjs-graphql-typeorm-sql`\
  `npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql`
- [x] 06:36 clean `app.controler.ts` and `app.service.ts`
- [x] 07:00 Setup GraphQL

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

- [x] 11:00 Create User Schema: code first approach\
   @ `/src/graphql/models/UserModel.ts`

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

- [x] 15:30 Create User Resolver\
  `/src/graphql/resolvers/UserResolver.ts`

  ```ts
  import { Query, Resolver } from '@nestjs/graphql';
  @Resolver()
  export class UserResolver {
    @Query(() => UserResolver)
    getUser() {
      return { id: 1, username: 'John', displayName: 'John the John' };
    }
  }
  ```

- [x] 17:10 Create Query
- [ ] 20:00 Auto Schema File
- [ ] 21:10 GraphQL Playground
- [ ] 24:17 Query Arguments
- [ ] 34:00 UserSetting Schema
- [ ] 42:00 Resolving Fields
- [ ] 1:00:14 Mutations
- [ ] 1:09:00 InputTypes
- [ ] 1:23:20 Setting up TypeORM & SQL
