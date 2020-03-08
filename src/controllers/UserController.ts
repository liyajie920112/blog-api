import { Get, JsonController, QueryParam, QueryParams, Req, Post, Body, UploadedFile, } from 'routing-controllers'
import { getCustomRepository } from 'typeorm'
import { AdminRepository } from '../repositorys/AdminRepository'
import { BaseController } from './BaseController'
import { User } from '../entity/Users'
import { getMd5, verifyToken } from '../utils/common'
import { Request } from 'koa'
import { Role } from '../entity/Role'
import { UpdatePwdModel } from '../viewmodel/UpdatePwdModel'
import { UserFromToken } from '../decorators/UserFromToken'
import { bufferToImg } from '../utils/file'

@JsonController('/user')
export class UserController extends BaseController {
  @Get('/list')
  async getUserByNameAndPwd(@QueryParams() params: any) {
    const bbAdminRepository = getCustomRepository(AdminRepository)
    const r = await bbAdminRepository.findByUsernameAndPwd(params.username, params.password)
    const _r = this.returnData(r)
    if (!r) {
      _r.msg = '用户不存在'
    }
    return _r
  }

  @Get('/create')
  async addUser() {
    const model = new User()
    model.username = 'admin2'
    model.password = getMd5('111111')
    model.nickname = '管理员2'
    const role = new Role()
    role.rolename = 'admin'
    role.rolevalue = 'admin'
    model.roles = [role]
    await this.getRoleRepo().addRole(role)
    await this.getUserRepo().addUser(model)
    return this.returnSuccess(model)
  }

  @Get('/my')
  async getUserByToken(@Req() request: Request) {
    const { authorization } = request.header
    if (authorization) {
      const userinfo: any = await verifyToken(authorization)
      const { data } = userinfo
      if (data) {
        const user = await this.getUserRepo().getUserById(data.id)
        user.password = ''
        return this.returnSuccess(user)
      }
      return this.returnError('查询失败')
    }
    return this.returnError('授权失败')
  }

  @Get('/info')
  async getUserInfoByToken(@QueryParam('token') token: string) {
    const userinfo: any = await verifyToken(token)
    const { data } = userinfo
    if (data) {
      const user = await this.getUserRepo().getUserById(data.id)
      user.password = ''
      const d = {
        roles: user.roles.map(a => a.rolevalue),
        name: user.nickname,
        avatar: process.env.baseUrl + user.avatar + '?v=' + Date.now(),
        introduction: ''
      }
      return this.returnSuccess(d)
    }
    return this.returnError('用户信息获取失败')
  }

  @Post('/update')
  async updateUser(@Body() user: User, @UserFromToken({ required: true }) user2: User) {
    user.id = user2.id
    const r = await this.getUserRepo().updateUser(user, ['nickname', 'lastLoginTime'])
    return this.returnData({}, '修改成功')
  }

  @Post('/updatepwd')
  async updatepwd(@Body() pwdinfo: UpdatePwdModel, @UserFromToken({ required: true }) user: User) {
    const _user = await this.getUserRepo().getUserById(user.id)
    // 判断原密码是否相同
    const _md5pwd = getMd5(pwdinfo.oldPwd)
    if (_md5pwd !== _user.password) {
      return this.returnError('旧密码有误')
    }
    const r = await this.getUserRepo().updatePwd(user.id, pwdinfo)
    return this.returnData({}, '修改成功')
  }

  @Post('/uploadavatar')
  async updateUserAvatar(@UploadedFile('avatar') file: any, @UserFromToken({ required: true }) user: User) {
    const r = bufferToImg(file, getMd5(user.id), 0)
    if (!r) {
      return this.returnError('头像修改失败')
    }
    // 更新数据库
    user.avatar = r.relativePath
    await this.getUserRepo().updateUser(user, ['avatar'])
    return this.returnSuccess({
      avatar: r.showPath + '?v=' + Date.now(),
      relativeAvatar: r.relativePath
    }, '修改成功')
  }

  @Post('/logout')
  async logout() {
    return this.returnSuccess({})
  }
}
