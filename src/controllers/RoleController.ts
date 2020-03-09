import { Get, JsonController, QueryParam, QueryParams, Req, Post, Body, UploadedFile, BodyParam, } from 'routing-controllers'
import { BaseController } from './BaseController'
import { Request } from 'koa'
import { Role } from '../entity/Role'

@JsonController('/role')
export class RoleController extends BaseController {
  
  @Post('/create')
  async create(@Body() role: Role) {
    const r = await this.getRoleRepo().addRole(role)
    if (r) {
      return this.returnSuccessMsg(role.id ? '修改成功' : '添加成功')
    }
    return this.returnError('添加角色失败')
  }

  @Get('/list')
  async index() {
    const list = await this.getRoleRepo().getRoles()
    return this.returnSuccess(list)
  }

  @Post('/delete')
  async delete(@BodyParam('id') id: string) {
    const r = await this.getRoleRepo().deleteRoleById(id)
    return this.returnSuccessMsg('删除成功')
  }
}
