import { EntityRepository, AbstractRepository } from 'typeorm'
import { Role } from '../entity/Role'

@EntityRepository(Role)
export class RoleRepository extends AbstractRepository<Role> {
  
  addRole(m: Role) {
    return this.repository.save(m)
  }
}

