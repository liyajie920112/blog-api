import { Controller, Get, JsonController, QueryParam, QueryParams, Body, Post, Authorized, } from 'routing-controllers'
import { getCustomRepository } from 'typeorm'
import { AdminRepository } from '../repositorys/AdminRepository'
import { BaseController } from './BaseController'
import { User } from '../entity/Users'
import { UserRepository } from '../repositorys/UserRepository'
import { getMd5, getToken, verifyToken } from '../utils/common'
import { UserLoginModel } from '../viewmodel/UserLoginModel'
import { Admin } from '../entity/Admin'
import { AdminLoginModel } from '../viewmodel/AdminLoginModel'

@JsonController('/login')
export class LoginController extends BaseController {

  @Post('/user')
  async loginByUsernameAndPwd(@Body() user: UserLoginModel) {
    const r = await this.getUserRepo().getUserByUsernameAndPwd(user.username, user.password)
    const _r = {
      data: {},
      token: '',
    }
    if (r) { // 登录成功
      // 更新最后登录时间
      r.lastLoginTime = new Date()
      this.getUserRepo().updateUser(r, ['lastLoginTime'])
      _r.data = {}
      _r.token = getToken(r)
      return this.returnSuccess(_r)
    }

    return this.returnError('用户名或密码错误')
  }

  @Post('/admin')
  async loginByAdminAndPwd(@Body() admin: AdminLoginModel) {
    const r = await this.getAdminRepo().findByUsernameAndPwd(admin.username, admin.password)
    console.log('r', r)
    const _r = {
      data: {},
      token: ''
    }
    if (r) { // 登录成功
      _r.data = {}
      _r.token = getToken(r)
      return this.returnSuccess(_r)
    }

    return this.returnError('用户名或密码错误')
  }

  @Post('/checktoken')
  async checkToken(@QueryParam('token') token: string) {
    try {
      const userinfo = await verifyToken(token)
      if (userinfo) {
        return this.returnSuccess({})
      }
      return this.returnError('授权失败', 401)
    } catch (e) {
      return this.returnError('授权失败', 401)
    }
  }
}
