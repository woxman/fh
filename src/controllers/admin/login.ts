
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const login = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

	const handle = async () => {
    const { email, password } = req.body

    let ip: string = 'unknown'
    if(req.ips.length) {
      ip = req.ips[0]
    }
    
    const reportDetails = {
      ip
    }

		return await adminService.login(email, password, reportDetails)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default login
