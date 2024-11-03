import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { UserPostEntity } from 'src/typeorm/entities/user.post.entity';
import { TypeCreateUserPost } from 'src/users/types/user-post.types';
import { Repository } from 'typeorm';

@Injectable()
export class UserPostService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserPostEntity)
    private userPostRepository: Repository<UserPostEntity>,
  ) {}

  //-----------
  async createUserPost(id: number, postData: TypeCreateUserPost) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.userPostRepository.create({
      ...postData,
      user: { id: user.id },
    });
    return await this.userPostRepository.save(newPost);
  }

  //----------
  async getUserPosts(id: number) {
    const posts = await this.userPostRepository.find({
      where: { user: { id } },
      relations: ['user'],
    });

    return posts;
  }

  //----------
  async getUserSinglePost(id: number, postId: number) {
    const post = await this.userPostRepository.findOne({
      where: { id: postId, user: { id } },
      relations: ['user'],
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }
}
