
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const getCurrentAdmin = async (req: Request, res: Response) => {

	const handle = async () => {
    const adminId = res.locals.admin?._id

		return await adminService.getAdmin(adminId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getCurrentAdmin
