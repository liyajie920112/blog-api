import { PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export class BaseModel {

  /**
   * 主键id
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createTime: Date = new Date();

  /**
   * 是否已经删除
   */
  @Column({ default: false })
  isDel: boolean;

}
