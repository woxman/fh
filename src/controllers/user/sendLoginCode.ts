
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const sendLoginCode = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    phone: yup.string().required(),
  })

	const handle = async () => {
    const { phone } = req.body

		return await userService.sendLoginCode(phone)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default sendLoginCode
