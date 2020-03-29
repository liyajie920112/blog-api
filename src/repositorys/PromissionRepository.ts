import { EntityRepository, AbstractRepository } from 'typeorm'
import { Promission } from '../entity/Permission'

@EntityRepository(Promission)
export class PromissionRepository extends AbstractRepository<Promission> {
  
  async add(m: Promission) {
    if (m.id) {
      return this.updateById(m)
    }
    // 计算权限位
    const count = await this.repository.count()
    if (count === 0) {
      m.promissionPos = 0
      m.promissionValue = 1
    } else {
      // 判断是否左移了60个
      const last = await this.repository.createQueryBuilder('promission').orderBy('createTime', 'DESC').limit(1).getOne()
      console.log('last', last)
      if (last.promissionValue < 1 << 60) {
        m.promissionPos = last.promissionPos
        m.promissionValue = last.promissionValue << 1
      } else {
        m.promissionPos = last.promissionPos + 1
        m.promissionValue = 1
      }
    }
    return this.repository.save(m)
  }

  updateById(model: Promission) {
    return this.repository.update(model.id, model)
  }

  getList(isDel: boolean = false) {
    return this.repository.createQueryBuilder('promissionlist').orderBy('createTime').where('promissionlist.isDel=' + isDel).getMany()
  }

  getById(id: string) {
    return this.repository.findOne(id)
  }

  async deleteById(id: string) {
    return this.repository.update(id, { isDel: true })
  }
}

