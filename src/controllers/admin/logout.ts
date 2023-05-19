
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const logout = async (req: Request, res: Response) => {

	const handle = async () => {
    const token = req.headers.authorization?.replace('Bearer ', '') as string
    
    let ip: string = 'unknown'
    if(req.ips.length) {
      ip = req.ips[0]
    }
    
    const reportDetails = {
      adminId: res.locals.admin._id,
      ip
    }

		return await adminService.logout(token, reportDetails)
	}

	return handleRequest({ req, res, handle })
}

export default logout
