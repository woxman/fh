
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const login = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    phone: yup.string().required(),
    code: yup.string().required(),
  })

	const handle = async () => {
    const { phone, code } = req.body

		return await userService.login(phone, code)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default login
