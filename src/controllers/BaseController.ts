import { Controller } from "routing-controllers";
import { ReturnModel } from "../viewmodel/ReturnModel";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositorys/UserRepository";
import { RoleRepository } from "../repositorys/RoleRepository";
import { AdminRepository } from "../repositorys/AdminRepository";

@Controller()
export class BaseController {

  getUserRepo() {
    const repo = getCustomRepository(UserRepository)
    return repo
  }

  getRoleRepo() {
    const repo = getCustomRepository(RoleRepository)
    return repo
  }

  getAdminRepo() {
    const repo = getCustomRepository(AdminRepository)
    return repo
  }

  returnData(data: object | undefined, msg: string = 'success') {
    let code = 200
    if (!data) {
      msg = 'error'
      code = -1
    }
    return new ReturnModel(data || {}, msg, code)
  }

  returnError(error: string, code: number = -1) {
    return new ReturnModel({}, error || 'error', code, error)
  }

  returnSuccess(data: object | undefined, msg: string = '成功') {
    return new ReturnModel(data, msg)
  }
}
