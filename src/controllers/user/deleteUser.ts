
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const deleteUser = async (req: Request, res: Response) => {

	const handle = async () => {
    const userId = req.params.id

		return await userService.deleteUser(userId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteUser
