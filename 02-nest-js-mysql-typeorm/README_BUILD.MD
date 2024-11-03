#  NestJS MySQL TypeORM

## Date:  Aug 12, 2022

Covering the basics from creating, reading, updating, and deleting
data from our MySQL database, all the way to one-to-one relationships
and one-to-many and many-to-one.

By the end of this video, you will become more comfortable with working
with TypeORM entities and repositories to build persistent applications!

[Watch](https://www.youtube.com/watch?v=W1gvIw0GNl8&list=PL_cUvD4qzbkw-phjGK2qq0nQiG6gw1cKK&index=3&ab_channel=AnsontheDeveloper)

[Code: https://github.com/stuyy/nestjs-typeo>...](<https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa1ZQTmdiVTlFTGxMLS1wNkp3Y0N2eHhKNTlMd3xBQ3Jtc0tsZFEtVjVlVGdyM2p6TUMxSEZhRDJPcFF0RFl4NloxOXNGamFaUWdTbUVCT2ZEMTFLUktBRW8zb0U0UTItajNiZ0RfQnJocXFPbEJaWDdaRGNrX1lNNXgtaWZtM0pLd01UZTZMZ2NrUndwYmZ6Zmp0UQ&q=https%3A%2F%2Fgithub.com%2Fstuyy%2Fnestjs-typeorm-mysql-course-repository&v=W1gvIw0GNl8>)

## Schedule

- [x] 00:01 introduction
- [x] 00:52 start a new NestJS project
- [x] 01:40 check having mysql-server & mysql-cli installed
- [x] 02:40 install packages `npm i @nestjs/typeorm typeorm mysql2`
- [x] 03:20 connect to the project to a new Database: import `TypeOrmModule` in `app.module.ts` and complete configuration
- [x] 03:48 use mysql-cli to create the previously declared databasedo not forget privileges if necessary\

  ```sh
     # connect as root; enter the password when prompted
     mysql - u root - p
  ```

  ```sql
  -- created the databases:
  CREATE DATABASE database_name DEFAULT CHARACTER SET utf8;
  
  -- create a user
  CREATE USER IF NOT EXISTS 'user_name' @'localhost' IDENTIFIED BY 'password';

  -- grant in advance all privileges on databases that user 'daniel' could created
  GRANT ALL PRIVILEGES ON database_name.* TO 'user_name' @'localhost';
  ```

- [x] 07:34 setup .env file at root project +  `npm i --save @nestjs/config`  + config `app.module.ts`
- [x] 07:57 setup TypeORM entities: `user.entity.ts`
- [x] 16:14 generate a new module `users` & `/users/controllers/users`
- [x] 16:40 generate a new module new user controller `/users/controllers/users`
- [x] 17:10 generate a new users services `/users/services/users`
- [x] 18:07 create routes : `getUsers()` & `createUser()`
- [x] 19:20 in `user.service.ts` define the service functions for the previously defined routes: `fetchUsers()` & `createUser()`
- [x] 20:30 interact with the database: inject the TypeORM repository in the user Service class

  ```ts
  import { InjectRepository } from '@nestjs/typeorm';
  import { UserEntity } from 'src/typeorm/entities/user.entity';
  import { Repository } from 'typeorm';

    constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  ```

  ```ts
  import { Module } from '@nestjs/common';
  import { UsersController } from './controllers/users/users.controller';
  import { UsersService } from './services/users/users.service';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { UserEntity } from 'src/typeorm/entities/user.entity';

  @Module({
    imports: [TypeOrmModule.forFeature([UserEntity])], // new !
    controllers: [UsersController],
    providers: [UsersService],
  })
  export class UsersModule {}
  ```

- [x] 23:07 create `/src/users/dtos/create-user.dto.ts` and insert it into `src/users/controllers/users/users.controller.ts`

  ```ts
  export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  country: string;
  }
  ```

  ```ts
  import { Body, Controller, Get, Post } from '@nestjs/common';
  import { CreateUserDto } from 'src/users/dtos/create-user.dto';
  import { UsersService } from 'src/users/services/users/users.service';

  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get()
    getUsers() {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
      this.userService.createUser(createUserDto);
    }
  }

  ```

- [x] 25:42 create a create user type `/src/users/types/user.types.ts`

  ```ts
  export type TypeCreateUser = {
  username: string;
  email: string;
  password: string;
  country: string;
  };
  ```

- [x] 30:07 create and test `createUser()`

  ```ts
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { UserEntity } from 'src/typeorm/entities/user.entity';
  import { TypeCreateUser } from 'src/users/types/user.types';
  import { Repository } from 'typeorm';

  @Injectable()
  export class UsersService {
    constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
    ) {}
    fetchUsers() {}

    createUser(userDetails: TypeCreateUser) {
      const newUser = this.userRepository.create({ ...userDetails });
      return this.userRepository.save(newUser);
    }
  }
  ```

- [x] 31:23 fetch record from the database
- [x] 35:35 updating user
- [x] 41:33 delete user
- [x] 43:40 one-to-one relationship

  ```ts
  import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

  @Entity({ name: 'usersProfile' })
  export class UserProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    age: number;

    @Column({ nullable: false })
    date_of_birth: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    phone_number: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  }
  ```

  ```ts
  import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  } from 'typeorm';
  import { UserProfileEntity } from './user.profile.entity';

  @Entity({ name: 'users' })
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: true })
    country: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToOne(() => UserProfileEntity)
    @JoinColumn({})
    user_profile: UserProfileEntity;
  }
  ```

- [x] 58:30 test create profile for an existing user
- [x] 01:01:30 make all the one-to-one relation data appears
- [x] 01:03:24 starting one-to-many relationship: usr can have many posts, and each post belong to one user
- [x] 01:05:30 define many-to-one & one-to-many relationship
- [x] 01:08:10 import the post module in the app.module.ts
