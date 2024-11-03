import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities/user.entity';
import { UserProfileEntity } from 'src/typeorm/entities/user.profile.entity';
import { UserProfileService } from './services/user-profile/user.profile.service';
import { UserProfileController } from './controllers/user-profile/users.profile.controller';
import { UserPostEntity } from 'src/typeorm/entities/user.post.entity';
import { UserPostController } from './controllers/user-post/user.post.controller';
import { UserPostService } from './services/user-post/user.post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserProfileEntity, UserPostEntity]),
  ],
  controllers: [UsersController, UserProfileController, UserPostController],
  providers: [UsersService, UserProfileService, UserPostService],
})
export class UsersModule {}
