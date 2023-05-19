
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const forgetPassword = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    email: yup.string().email().required()
  })

	const handle = async () => {
    const { email } = req.body

		return await adminService.forgetPassword(email)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default forgetPassword
