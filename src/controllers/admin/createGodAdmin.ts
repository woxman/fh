
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const createGodAdmin = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    phone: yup.string().required(),
    password: yup.string().required(),
    name: yup.string().required()
  })

	const handle = async () => {
    const { email, password, phone, name } = req.body

    const godAdmin = {
      isGodAdmin: true,
      email,
      password,
      phone,
      name
    }

		return await adminService.createGodAdmin(godAdmin)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default createGodAdmin
