import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { verifyToken, checkedWhiteList } from '../utils/common'

@Middleware({ type: "before" })
export class LoggingMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    const { request } = context
    const authorization = request.header.authorization
    if (checkedWhiteList(context.url)) {
      return await next()
    }
    if (authorization) { // 如果有token
      // 验证token的正确性
      try {
        const r = await verifyToken(authorization)
        return await next()
      } catch (e) {
        // 验证refreshToken是否失效
        if (e === false) {
          context.body = {
            msg: '没有授权',
            code: 401
          }
        } else {
          context.body = {
            msg: '错误: ' + e,
            code: 500
          }
        }
      }
    } else { // 没有token, 说明没有登录
      context.body = {
        msg: '没有授权',
        code: 401
      }
    }
  }
}