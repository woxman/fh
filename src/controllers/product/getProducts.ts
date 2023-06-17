import * as yup from 'yup'
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const getProducts = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(['name', 'unit', 'weight', 'price', 'createdAt', 'updatedAt']),
    sortOrder: yup.string().oneOf(['asc', 'desc']),
    search: yup.string()
  })
  
  const handle = async () => {
    const { limit, skip, sortBy, sortOrder, search } = req.query
    
    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      search: search?.toString()
    }
    console.log("**************************")
    console.log(res.locals.admin._id)
    console.log("**************************")
		return await productService.getProducts(options)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, queryValidationSchema, handle, extractOutput })
}

export default getProducts
