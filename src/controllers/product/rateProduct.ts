
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const rateProduct = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    rating: yup.number().min(0).max(5).required()
  })

	const handle = async () => {
    const userId = res.locals.user._id
    const { productId } = req.params
    const { rating } = req.body

		return await productService.rateProduct(productId, rating, userId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default rateProduct
