
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"
import { permissions } from "../../utils/constants"
import { ObjectId  as objectId } from 'mongoose'

const addUser = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({    
    phone: yup.string().required(),
    email: yup.string().email(),
    name: yup.string().required(),
    addresses: yup.array().of(yup.string())
  })

	const handle = async () => {
    
        const { phone, email, name, addresses} = req.body

        const newUser = {
            phone:phone.trim(),
            email: email.trim(),
            name: name.trim(),
            addresses,            
        }

        let ip: string = 'unknown'
        if(req.ips.length) {
            ip = req.ips[0]
        }

        const reportDetails = {
            adminId: res.locals.admin._id,
            ip
        }

		return await userService.addUser(newUser, reportDetails)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addUser
