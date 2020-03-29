import { Entity, Column } from "typeorm";
import { BaseModel } from "../BaseModel";

@Entity('lyj_tag')
export class Tag extends BaseModel {

  @Column({ length: 50, comment: '标签名称' })
  tagName: string;

}
