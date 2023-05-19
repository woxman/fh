import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import factoryService from "../../db/models/factory/factory.service"

const getFactory = async (req: Request, res: Response) => {
	
  const handle = async () => {
    const { factoryId } = req.params

		return await factoryService.getFactory(factoryId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getFactory
