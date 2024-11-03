import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class CreateUserProfileDto {
  firstName: string;
  lastName: string;
  password: string;
  age: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_of_birth?: Date;
  email: string;
  @IsOptional()
  country: string;
  @IsOptional()
  address: string;
  @IsOptional()
  phone_number: number;
}
