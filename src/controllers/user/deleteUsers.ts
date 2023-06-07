
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const deleteUsers = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string().length(24)).required()
  })

	const handle = async () => {		
        const { idList } = req.body
        
        let ip: string = 'unknown'
        if(req.ips.length) {
        ip = req.ips[0]
        }
        
        const reportDetails = {
            adminId: res.locals.admin._id,
            ip
        }

		return await userService.deleteUsers(idList, reportDetails)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deleteUsers