
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const deleteAdmins = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string().length(24)).required()
  })

	const handle = async () => {
		const currentAdminIsGodAdmin = res.locals.admin?.isGodAdmin
    const { idList } = req.body
    
    let ip: string = 'unknown'
    if(req.ips.length) {
      ip = req.ips[0]
    }
    
    const reportDetails = {
      adminId: res.locals.admin._id,
      ip
    }

		return await adminService.deleteAdmins(currentAdminIsGodAdmin, idList, reportDetails)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deleteAdmins
