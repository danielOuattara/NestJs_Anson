import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

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
  createUser(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    res.send('created');
  }
}
