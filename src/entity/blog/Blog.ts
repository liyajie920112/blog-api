import { Entity, Column, ManyToOne, JoinTable } from "typeorm";
import { BaseModel } from "../BaseModel";
import { User } from "../Users";

@Entity('lyj_blog')
export class Blog extends BaseModel {

  @Column({ length: 100, comment: '博客标题' })
  title: string;

  @Column({ length: 1000, comment: '唯一的拼音title' })
  unionTitle: string;

  @Column({ length: 200, comment: '简述' })
  desc: string = '';

  @Column({ type: 'text' , comment: '博客内容' })
  blogContent: string;

  @Column({ length: 1000, comment: '顶部图' })
  banner: string = '';

  @Column({ comment: '状态, 1: 草稿, 2: 已发布' })
  status: number = 1;

  @Column({ length: 100, comment: '标签' })
  tags: string = '';

  @ManyToOne(type => User)
  @JoinTable()
  user: User;
}
