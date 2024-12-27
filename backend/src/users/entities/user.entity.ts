import { GroupEntity } from '../../groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { UserResponseDTO } from '../dtos/response/user.response.dto';
import { RatingEntity } from '@/ratings/entities/rating.entity';

@Entity('users')
export class UserEntity {
  constructor(email: string) {
    this.email = email;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => GroupEntity, (group) => group.users, {
    nullable: true,
    cascade: true,
  })
  groups: GroupEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  ratings: RatingEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;

  mapToResponseDTO(): UserResponseDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
