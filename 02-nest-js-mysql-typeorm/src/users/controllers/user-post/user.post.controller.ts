import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserPostDto } from 'src/users/dtos/user-post/create-user-post.dto';
import { UserPostService } from 'src/users/services/user-post/user.post.service';

@Controller('users/:id/posts')
export class UserPostController {
  constructor(private readonly userPostService: UserPostService) {}
  @Post()
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userPostService.createUserPost(id, createUserPostDto);
  }

  @Get()
  getUserPosts(@Param('id', ParseIntPipe) id: number) {
    return this.userPostService.getUserPosts(id);
  }

  @Get(':postId')
  getUserSinglePost(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.userPostService.getUserSinglePost(id, postId);
  }
}
