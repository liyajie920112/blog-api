import { Get, JsonController, QueryParam, QueryParams, Req, Post, Body, UploadedFile, BodyParam, } from 'routing-controllers'
import { BaseController } from './BaseController'
import { Promission } from '../entity/Permission'

@JsonController('/promission')
export class PromissionController extends BaseController {
  
  @Post('/create')
  async create(@Body() model: Promission) {
    const r = await this.getPromissionRepo().add(model)
    if (r) {
      return this.returnSuccessMsg(model.id ? '修改成功' : '添加成功')
    }
    return this.returnError('添加权限失败')
  }

  @Get('/list')
  async index() {
    const list = await this.getPromissionRepo().getList()
    return this.returnSuccess(list)
  }

  @Post('/delete')
  async delete(@BodyParam('id') id: string) {
    const r = await this.getPromissionRepo().deleteById(id)
    return this.returnSuccessMsg('删除成功')
  }
}
