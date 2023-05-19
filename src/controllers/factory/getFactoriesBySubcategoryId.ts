import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import factoryService from "../../db/models/factory/factory.service"

const getFactoriesBySubcategoryId = async (req: Request, res: Response) => {
	
  const handle = async () => {
    const { subcategoryId } = req.params

		return await factoryService.getFactoriesBySubcategoryId(subcategoryId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getFactoriesBySubcategoryId
