import { EntityRepository, AbstractRepository } from 'typeorm'
import { Admin } from '../entity/Admin'

@EntityRepository(Admin)
export class AdminRepository extends AbstractRepository<Admin> {
  getUserById(id: any) {
    return this.repository.findOne({ id })
  }
  
  findByUsernameAndPwd(username: string, password: string) {
    return this.repository.findOne({ username, password })
  }

  addAdmin(m: Admin) {
    return this.repository.save(m)
  }
}

