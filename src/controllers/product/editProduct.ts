
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import { allowedImageFormats } from '../../utils/constants'
import productService from "../../db/models/product/product.service"

const editProduct = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    updates: yup.object({
      name: yup.string(),
      factory: yup.string().length(24),
      description: yup.string(),
      properties: yup.array().of(yup.object({
        name: yup.string().required(),
        value: yup.string().required()
      })),
      unit: yup.string(),
      price: yup.number(),
      tags: yup.array().of(yup.string()),
      images: yup.array().of(yup.mixed<string | {
        format: 'svg' | 'png' | 'jpeg' | 'jpg'
        data: Buffer
      }>())
    }).required()
  })

	const handle = async () => {
    const { productId } = req.params
    
    const allowedUpdates = ['name', 'factory', 'description', 'properties', 'unit', 'price', 'tags', 'images']
    const updates: { [key: string]: any } = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(['name'].includes(update)) {
          updates[update] = req.body.updates[update].trim()
        } else {
          updates[update] = req.body.updates[update]
        }
      }
    })

		return await productService.editProduct(productId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editProduct
