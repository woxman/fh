import { Request, Response } from 'express'
import * as yup from 'yup'

import { handleRequest } from '../helper'
import factoryService from "../../db/models/factory/factory.service"

const deleteFactories = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string().required())
  })

	const handle = async () => {
    const { idList } = req.body
		return await factoryService.deleteFactories(idList)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default deleteFactories
