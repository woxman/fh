
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const logout = async (req: Request, res: Response) => {

	const handle = async () => {
    const token = req.headers.authorization?.replace('Bearer ', '') as string

		return await userService.logout(token)
	}

	return handleRequest({ req, res, handle })
}

export default logout
