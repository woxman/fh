import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const editUserPanel = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    updates: yup.object({
      name: yup.string(),
      email: yup.string().email(), 
      postCode: yup.string(),
      shSabtMelli: yup.string(),
      shEghtasadi: yup.string(),
      addresses: yup.array().of(yup.string())
    })
  })

	const handle = async () => {

    const { userId } = req.params

    const allowedUpdates = ["name", "email", "addresses", "postCode", "shSabtMelli", "shEghtasadi"]

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

export default editUserPanel
