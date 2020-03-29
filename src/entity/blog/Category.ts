import { BaseModel } from "../BaseModel";
import { Column } from "typeorm";

export class Category extends BaseModel {

  @Column({ length: '50', comment: '分类名称' })
  categoryName: string;
}
