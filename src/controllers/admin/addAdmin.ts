
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"
import { permissions } from "../../utils/constants"
import { ObjectId  as objectId } from 'mongoose'

const addAdmin = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    isSuperAdmin: yup.boolean().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    name: yup.string().required(),
    permissions: yup.array().of(yup.string().oneOf(permissions))
  })

	const handle = async () => {
		const currentAdminIsGodAdmin = res.locals.admin?.isGodAdmin
    
    const { isSuperAdmin, email, password, phone, name, permissions } = req.body

    const newAdmin = {
      isSuperAdmin,
      email: email.trim(),
      password: password.trim(),
      phone: phone.trim(),
      name: name.trim(),
      permissions
    }

    let ip: string = 'unknown'
    if(req.ips.length) {
      ip = req.ips[0]
    }

    const reportDetails = {
      adminId: res.locals.admin._id,
      ip
    }

		return await adminService.addAdmin(currentAdminIsGodAdmin, newAdmin, reportDetails)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addAdmin
