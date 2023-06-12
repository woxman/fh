import * as yup from 'yup'
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const getFactoriesProductsBySubcategoryId = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string()
  })
  
  const handle = async () => {
    let { subcategoryUrlSlug } = req.body
    subcategoryUrlSlug =decodeURI(subcategoryUrlSlug )
    const { limit, skip } = req.query
    
    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined
    }

		return await productService.getFactoriesProductsBySubcategoryUrlSlug(subcategoryUrlSlug, options)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, queryValidationSchema, handle, extractOutput })
}

export default getFactoriesProductsBySubcategoryId
