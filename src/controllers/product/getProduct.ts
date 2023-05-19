import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"

const getProduct = async (req: Request, res: Response) => {
	
  const handle = async () => {
    const { productId } = req.params
		return await productService.getProduct(productId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getProduct
