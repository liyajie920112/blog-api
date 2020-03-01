import { Entity, Column } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity('ex_question')
export class Question extends BaseModel {

  @Column({ comment: '该题的大类型' })
  question_category: string;

  @Column({ length: 500, comment: '题目' })
  question_title: string;

  @Column({ comment: '类型, 1: 单选, 2: 多选 3: 判断' })
  question_type: number;

  @Column({ length: 100, comment: '答案' })
  question_answer: string;

  @Column({ length: 100, comment: '选项, 使用json字符串存储' })
  question_selects: string;

}
