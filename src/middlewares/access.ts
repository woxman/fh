import { Request, Response } from "express"

import { IAdmin } from "../db/models/admin/admin"
import { statusCodes, errorMessages } from "../utils/constants"

const access = (permissions: string[]) => {
  return async (req: Request, res: Response, next: Function) => {
    try {

      const admin = res.locals.admin
      console.log(admin)
      const hasAccess = admin.isGodAdmin || permissions.every((permission) => {
        return admin.permissions.includes(permission)
      })

      if(!hasAccess) {
        res.status(statusCodes.unauthorized).send({ message: errorMessages.shared.permissionsRequired })
        return
      }
  
      next()
    } catch(error) {
      res.status(statusCodes.ise).send({ message: errorMessages.shared.ise })
    }
  }
}
export default access