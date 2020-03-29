import "reflect-metadata";
import { createKoaServer } from 'routing-controllers'
import { AdminController } from './controllers/AdminController'
import { createConnection } from "typeorm"
import { argv } from 'yargs'
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { LoggingMiddleware } from "./middleware/LoginMiddleware";
import { RefreshTokenMiddleware } from "./middleware/RefreshTokenMiddleware";
import { RoleController } from "./controllers/RoleController";
import { PromissionController } from "./controllers/PromissionController";
import { InitController } from "./controllers/InitController";
import { BlogController } from "./controllers/BlogController";
const serve = require('koa-static')

console.log('argv', argv)
createConnection().then(conn => {
    const app = createKoaServer({
        routePrefix: '/api',
        cors: true,
        controllers: [AdminController, UserController, LoginController, RoleController, PromissionController, InitController, BlogController],
        middlewares: [LoggingMiddleware, RefreshTokenMiddleware]
    })

    console.log(__dirname + '/static')
    app.use(serve(__dirname + '/static'))

    app.listen(3000)
    console.log('服务启动成功...' + new Date())
})
