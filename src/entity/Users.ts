import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Role } from "./Role";

@Entity('base_user')
export class User extends BaseModel {

  @Column({ length: 30, comment: '用户名' })
  username: string;

  @Column({ length: 30, comment: '昵称' })
  nickname: string;

  @Column({ length: 100, comment: '密码' })
  password: string;

  @Column({ length: 1000, comment: '头像' })
  avatar: string = '';

  @Column({ nullable: true, comment: '最后登陆时间' })
  lastLoginTime?: Date;

  @ManyToMany(type => Role )
  @JoinTable()
  roles: Role[];
}
