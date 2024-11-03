export type TypeCreateUserProfile = {
  firstName: string;
  lastName: string;
  password: string;
  age: number;
  email: string;
  date_of_birth?: Date;
  country?: string;
  address?: string;
  phone_number?: number;
};
