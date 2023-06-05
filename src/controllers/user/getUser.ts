import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/user/user.service"

const getUser = async (req: Request, res: Response) => {

	const handle = async () => {
    const { userId } = req.params

		return await adminService.getUser(userId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getUser