import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const editUser = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    updates: yup.object({
      name: yup.string(),
      email: yup.string().email(),
      addresses: yup.array().of(yup.string())
    })
  })

	const handle = async () => {

    const userId = res.locals.user._id

    console.log(userId)

    const allowedUpdates = ["name", "email", "addresses"]

    const updates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        updates[update] = req.body.updates[update]
      }
    })

		return await userService.editUser(userId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editUser
