import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserProfileDto } from 'src/users/dtos/user-profile/create-user-profile.dto';
import { UserProfileService } from 'src/users/services/user-profile/user.profile.service';

@Controller('users/:id/profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}
  @Post()
  createUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userProfileService.createUserProfile(id, createUserProfileDto);
  }

  @Get()
  getUserProfile(@Param('id', ParseIntPipe) id: number) {
    console.log({ id });
    return this.userProfileService.getUserProfile(id);
  }

  // @Patch(':id')
  // PatchUserById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() patchUserDto: UpdateUserDto,
  // ) {
  //   return this.userProfileService.patchUser(id, patchUserDto);
  // }

  // @Delete(':id')
  // DeleteUserById(@Param('id', ParseIntPipe) id: number) {
  //   return this.userProfileService.deleteUser(id);
  // }
}
