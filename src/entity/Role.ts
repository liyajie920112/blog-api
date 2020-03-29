import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity('base_role')
export class Role extends BaseModel {

  /**
   * 角色名称
   */
  @Column({ length: 100 })
  rolename: string;

  /**
   * 角色值
   */
  @Column({ length: 200 })
  rolevalue: string;

  /**
   * 角色描述
   */
  @Column({ length: 2000 })
  roledesc: string;

  /**
   * 角色权限值
   */
  @Column({ length: 1000 })
  rolePromissions: string = '';
}
