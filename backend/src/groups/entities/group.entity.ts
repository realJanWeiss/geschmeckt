import { UserEntity } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { GroupResponseDTO } from '../dtos/response/group.response.dto';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  secret: string;

  @ManyToMany(() => UserEntity, (user) => user.groups, {
    nullable: false,
  })
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;

  mapToResponseDTO(): GroupResponseDTO {
    return {
      id: this.id,
      name: this.name,
      secret: this.secret,
    };
  }
}
