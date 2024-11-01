import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Get()
  // getUsers(
  //   @Query('email') email?: string,
  //   @Query('sortdesc', ParseBoolPipe) sortBy?: boolean | undefined,
  // ) {
  //   console.log(sortBy, email);
  //   return [

  //   ];
  // }
  //

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
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
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log('userData = ', userData);
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fetchUserById(id);
  }

  @Get(':id/posts/:postId')
  getUserPostById(@Param('id') id: string, @Param('postId') postId: string) {
    return { id, postId };
  }
}
