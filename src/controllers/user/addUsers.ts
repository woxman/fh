
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"
import { permissions } from "../../utils/constants"
import { ObjectId  as objectId } from 'mongoose'

const addUsers = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({    
    phone: yup.array().of(yup.string().required()),
    email: yup.array().of(yup.string().required()),
    name: yup.array().of(yup.string().required()),
    addresses: yup.array().of(yup.string().required())
  })

	const handle = async () => {
    
        const { phone, email, name, addresses} = req.body

        const newUsers = {
            phone,
            email,
            name,
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

		return await userService.addUsers(newUsers, reportDetails)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addUsers
