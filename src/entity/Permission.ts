import { BaseModel } from "./BaseModel";
import { Column, Entity } from "typeorm";

@Entity('ex_permission')
export class Permission extends BaseModel {

  /**
   * 权限名
   */
  @Column({ length: 300 })
  permissionName: string;

  /**
   * 权限url
   */
  @Column()
  url: string;

  /**
   * 权限值
   */
  @Column({ comment: '权限值' })
  promissionValue: number;

  /**
   * 权限位置
   */
  @Column({ comment: '权限位' })
  promissionPos: number;

  /**
   * 父权限
   */
  @Column({ comment: '父权限' })
  parentPromission: string = '';
}
