import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"
import { permissions } from "../../utils/constants"

const editAdmin = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    updates: yup.object({
      isSuperAdmin: yup.boolean(),
      email: yup.string().email(),
      password: yup.string(),
      phone: yup.string(),
      name: yup.string(),
      permissions: yup.array().of(yup.string().oneOf(permissions))
    })
  })

	const handle = async () => {
    const currentAdminIsGodAdmin = res.locals.admin?.isGodAdmin

    const { adminId } = req.params

    const allowedUpdates = ["isSuperAdmin", "email", "phone", "name", "permissions"]

    const adminUpdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        
        if(["name", "phone", "email"].includes(update)) {
          adminUpdates[update] = req.body.updates[update].trim()

        } else {
          adminUpdates[update] = req.body.updates[update]
        }
      }
    })

		return await adminService.editAdmin(adminId, adminUpdates, currentAdminIsGodAdmin)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editAdmin
