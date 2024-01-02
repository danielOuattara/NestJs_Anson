import { Controller, Get } from '@nestjs/common';

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
        username: 'John',
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
}
