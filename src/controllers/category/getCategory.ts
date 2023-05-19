import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import categoryService from "../../db/models/category/category.service"

const getCategory = async (req: Request, res: Response) => {

	const handle = async () => {
    const { categoryId } = req.params
		return await categoryService.getCategory(categoryId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getCategory
