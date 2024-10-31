import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(
    @Query('email') email?: string,
    @Query('sortdesc', ParseBoolPipe) sortBy?: boolean | undefined,
  ) {
    console.log(sortBy, email);
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

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }

  @Get(':id/posts/:postId')
  getUserPostById(@Param('id') id: string, @Param('postId') postId: string) {
    return { id, postId };
  }
}
