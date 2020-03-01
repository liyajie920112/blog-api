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
}
