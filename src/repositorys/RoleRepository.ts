import { EntityRepository, AbstractRepository } from 'typeorm'
import { Role } from '../entity/Role'

@EntityRepository(Role)
export class RoleRepository extends AbstractRepository<Role> {
  
  addRole(m: Role) {
    if (m.id) {
      return this.updateRoleById(m)
    }
    return this.repository.save(m)
  }

  updateRoleById(model: Role) {
    return this.repository.update(model.id, model)
  }

  getRoles() {
    return this.repository.find({ isDel: false })
  }

  getRoleById(id: string) {
    return this.repository.findOne(id)
  }

  async deleteRoleById(id: string) {
    return this.repository.update(id, { isDel: true })
  }
}

