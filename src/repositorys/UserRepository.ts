import { EntityRepository, AbstractRepository } from 'typeorm'
import { User } from '../entity/Users'
import { getMd5 } from '../utils/common'

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  updatePwd(id: string, pwdinfo: import("../viewmodel/UpdatePwdModel").UpdatePwdModel) {
    // 检测原密码是否相同
    return this.repository.update(id, {
      password: getMd5(pwdinfo.confirmPwd)
    })
  }
  
  addUser(m: User) {
    return this.repository.save(m)
  }

  getUserByUsernameAndPwd(username: string, password: string) {
    const _md5pwd = getMd5(password)
    return this.repository.findOne({ username, password: _md5pwd, isDel: false })
  }

  getUserById(id: string) {
    return this.repository.findOne({ id }, { relations: ['roles'] })
  }

  async updateUser(user: User, columns: string[]) {
    const model = {}
    columns.forEach(columnName => {
      if (columnName === 'lastLoginTime') {
        if (user[columnName]) {
          model[columnName] = user[columnName]
        }
      } else {
        model[columnName] = user[columnName]
      }
    })
    return this.repository.update(user.id, model)
  }
}

