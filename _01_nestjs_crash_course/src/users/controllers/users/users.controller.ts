import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUser() {
    return { username: 'John Doe' };
  }

  @Get('posts')
  getUserPosts() {
    return [
      {
        username: 'John Doe',
        email: 'john@email.com',
        posts: [
          { id: 1, title: 'posts 1' },
          { id: 2, title: 'posts 2' },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUserPostsComments() {
    return [
      {
        posts: [
          { id: 1, title: 'comment on posts 1' },
          { id: 2, title: 'comment on posts 2' },
        ],
      },
    ];
  }

  @Post('posts')
  createUserPost(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    // res.send('created');
    res.json(req.body);
  }

  @Post('create')
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }
}
