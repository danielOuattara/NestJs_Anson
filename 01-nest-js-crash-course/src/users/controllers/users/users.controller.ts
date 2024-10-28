import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return [
      { id: 1, username: 'John', email: 'john@email.com' },
      { id: 2, username: 'Ann', email: 'ann@email.com' },
    ];
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        postOwnerId: 1,
        posts: [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' },
        ],
      },
    ];
  }
  @Get('/posts/comments')
  getUsersPostsComments() {
    return [
      {
        id: 1,
        commentOwnerId: 1,
        postOwnerId: 1,
        title: 'Post 1 is perfect',
      },
      {
        id: 1,
        commentOwnerId: 1,
        postOwnerId: 1,
        title: 'Post 1 was not as perfect as expected',
      },
    ];
  }

  /*  Express Way !
  ------------------ */
  //   @Post()
  //   createUser(@Req() request: Request, @Res() response: Response) {
  //     console.log(request.body);
  //     response.send('User Created');
  //   }

  /*  NestJS Way !
  ------------------ */
  @Post()
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }
}
