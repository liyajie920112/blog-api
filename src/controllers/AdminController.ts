import { Controller, Get, JsonController, QueryParam, QueryParams, Req,  } from 'routing-controllers'
import { getCustomRepository } from 'typeorm'
import { AdminRepository } from '../repositorys/AdminRepository'
import { BaseController } from './BaseController'
import { Admin } from '../entity/Admin'
import { Request } from 'koa'
import { verifyToken } from '../utils/common'

@JsonController('/admin')
export class AdminController extends BaseController {
  
  @Get('/admins')
  async getUserByNameAndPwd(@QueryParams() params: any) {
    const bbAdminRepository = getCustomRepository(AdminRepository)
    const r = await bbAdminRepository.findByUsernameAndPwd(params.username, params.password)
    return this.returnData(r)
  }

  @Get('/create')
  async addAdmin() {
    const admin = new Admin()
    admin.username = 'admin'
    admin.password = '111111'
    admin.lastLoginTime = new Date()

    const bbAdminRepository = getCustomRepository(AdminRepository)
    await bbAdminRepository.addAdmin(admin)
    return this.returnSuccess(admin)
  }

  @Get('/my')
  async getUserByToken(@Req() request: Request) {
    const { authorization } = request.header
    if (authorization) {
      const userinfo: any = await verifyToken(authorization)
      const { data } = userinfo
      if (data) {
        const user = await this.getAdminRepo().getUserById(data.id)
        user.password = ''
        return this.returnSuccess(user)
      }
      return this.returnError('查询失败')
    }
    return this.returnError('授权失败')
  }
}
