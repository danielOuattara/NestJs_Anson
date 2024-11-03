import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_profile' })
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  age: number;

  @Column({ type: 'date', nullable: false })
  date_of_birth: Date;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone_number: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
