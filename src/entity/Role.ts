import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity('ex_role')
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
}
