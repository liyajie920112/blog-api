import { createParamDecorator } from "routing-controllers";
import { verifyToken } from "../utils/common";

export function UserFromToken(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: async action => {
      const token = action.request.headers["authorization"];
      const userinfo: any = await verifyToken(token)
      return userinfo.data
    }
  })
}
