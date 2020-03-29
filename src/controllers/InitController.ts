import { Get, JsonController } from 'routing-controllers'
import { BaseController } from './BaseController'
import { User } from '../entity/Users'
import { getMd5 } from '../utils/common'
import { Role } from '../entity/Role'

@JsonController('/init')
export class InitController extends BaseController {
  @Get('/admin')
  async initAdmin() {
    const r = await this.getUserRepo().getUserByUsername('admin')
    if (r) {
      return this.returnSuccessMsg('已经初始化, 请勿重复执行')
    }
    const user = new User()
    user.username = 'admin'
    user.password = getMd5('liyajie920112')
    user.nickname = 'LiYajie'
    const role = new Role()
    role.rolename = 'admin'
    role.rolevalue = 'admin'
    role.roledesc = '超级管理员'
    await this.getRoleRepo().addRole(role)
    user.roles = [role]
    await this.getUserRepo().addUser(user)
    return this.returnSuccessMsg('初始化成功')
  }
}
