import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { verifyToken, getToken, checkedWhiteList } from '../utils/common'
import { config } from '../utils/config'

@Middleware({ type: "after" })
export class RefreshTokenMiddleware implements KoaMiddlewareInterface {

  async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    const { request } = context
    const authorization = request.header.authorization
    if (checkedWhiteList(context.url)) {
      return await next()
    }

    if (authorization) { // 如果有token
      // 验证token的正确性
      try {
        const r: any = await verifyToken(authorization)
        const exptime = r.exp * 1000
        if (exptime - Date.now() <= (config.get('token.tokenRefreshTime') * 1000)) { // 如果距离过期时间还有半个小时, 则需要更新token
          context.body.newToken = getToken(r.data)
        }
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