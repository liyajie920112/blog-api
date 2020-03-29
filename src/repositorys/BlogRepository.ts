import { EntityRepository, AbstractRepository } from 'typeorm'
import { Blog } from '../entity/blog/Blog'
import { PageModel } from '../viewmodel/PageModel'

@EntityRepository(Blog)
export class BlogRepository extends AbstractRepository<Blog> {
  
  getBlog(con: Object) {
    const options = {
      ...con,
      isDel: false
    }
    return this.repository.find(options)
  }

  getBlogById(id: string) {
    return this.repository.findOne({ id })
  }

  getBlogByUnionTitle(unionTitle: string) {
    return this.repository.findOne({ unionTitle })
  }
  
  async getList(status: number = 0, queryPage: PageModel) {
    queryPage.pageIndex = +queryPage.pageIndex
    queryPage.pageSize = +queryPage.pageSize
    let whereStr = 'blog.isDel = :isDel'
    if (status !== 0) {
      whereStr += ' and blog.status = :status'
    }
    const sqlQuery = this.createQueryBuilder('blog')
    .leftJoinAndSelect('blog.user', 'user')
    .where(whereStr, { isDel: false, status })
    .andWhere('user.id = blog.user_id')
    .select(['blog.*','user.nickname'])
    .orderBy('createTime', 'DESC')
    const total = await sqlQuery.getCount()
    const list = await sqlQuery.offset((queryPage.pageIndex - 1) * queryPage.pageSize)
    .limit(queryPage.pageSize)
    .execute()
    return {
      total,
      totalPage: Math.ceil(total / queryPage.pageSize),
      list,
      pageIndex: queryPage.pageIndex,
      pageSize: queryPage.pageSize
    }
  }

  create(model: Blog) {
    if (model.id) {
      this.repository.update(model.id, model)
      return model
    }
    return this.repository.save(model)
  }
}

