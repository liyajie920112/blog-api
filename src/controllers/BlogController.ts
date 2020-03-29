import { Get, JsonController, Body, Post, QueryParam, QueryParams } from 'routing-controllers'
import { BaseController } from './BaseController'
import { Blog } from '../entity/blog/Blog'
import { User } from '../entity/Users'
import { UserFromToken } from '../decorators/UserFromToken'
import { chineseToPinyin } from '../utils/common'
import { PageModel } from '../viewmodel/PageModel'

@JsonController('/blog')
export class BlogController extends BaseController {
  @Get('/list')
  async getList(@QueryParams() queryPage: PageModel) {
    const list = await this.getBlogRepo().getList(0, queryPage)
    return this.returnSuccess(list)
  }

  @Get('/list2')
  async getBlogList(@QueryParams() queryPage: PageModel) {
    const list = await this.getBlogRepo().getList(2, queryPage)
    return this.returnSuccess(list)
  }

  @Post('/save')
  async create(@Body() model: Blog, @UserFromToken({ required: true }) user: User) {
    model.user = user
    model.unionTitle = chineseToPinyin(model.title)
    const r = await this.getBlogRepo().create(model)
    return this.returnSuccess(r)
  }

  @Get('/detail')
  async detail(@QueryParam('id') id: string) {
    const r = await this.getBlogRepo().getBlogById(id)
    return this.returnSuccess(r)
  }

  @Get('/title')
  async titleBlog(@QueryParam('unionTitle') unionTitle: string) {
    const r = await this.getBlogRepo().getBlogByUnionTitle(unionTitle)
    return this.returnSuccess(r)
  }
}
