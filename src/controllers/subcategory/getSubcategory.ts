import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import subcategoryService from "../../db/models/subcategory/subcategory.service"

const getSubcategory = async (req: Request, res: Response) => {
	
  const handle = async () => {
    const { subcategoryId } = req.params
		return await subcategoryService.getSubcategory(subcategoryId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getSubcategory
