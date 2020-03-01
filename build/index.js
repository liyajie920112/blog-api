"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AdminController_1 = require("./controllers/AdminController");
const typeorm_1 = require("typeorm");
const yargs_1 = require("yargs");
const UserController_1 = require("./controllers/UserController");
const LoginController_1 = require("./controllers/LoginController");
console.log('argv', yargs_1.argv);
typeorm_1.createConnection().then(conn => {
    const app = routing_controllers_1.createKoaServer({
        routePrefix: '/api',
        cors: true,
        controllers: [AdminController_1.AdminController, UserController_1.UserController, LoginController_1.LoginController]
    });
    app.listen(3000);
    console.log('服务启动成功...' + new Date());
});
//# sourceMappingURL=index.js.map