
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const changePassword = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    password: yup.string().required(),
  })

	const handle = async () => {
    const adminId = res.locals.admin?._id
    const { password } = req.body

		return await adminService.changePassword(adminId, password)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default changePassword
