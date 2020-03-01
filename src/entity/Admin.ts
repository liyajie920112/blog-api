import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Min } from 'class-validator'

@Entity('ex_admin')
export class Admin extends BaseModel {

    @Min(1)
    @Column({ length: 30, comment: '用户名' })
    username: string;

    @Column({ length: 100, comment: '密码' })
    password: string;

    @Column({ nullable: true, comment: '最后登陆时间' })
    lastLoginTime?: Date;

}
