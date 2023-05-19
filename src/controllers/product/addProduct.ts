
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import productService from "../../db/models/product/product.service"
import { allowedImageFormats } from '../../utils/constants'

const addProduct = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    factory: yup.string().length(24).required(),
    name: yup.string().required(),
    description: yup.string().required(),
    properties: yup.array().of(yup.object({
      name: yup.string().required(),
      value: yup.string().required()
    })).required(),
    unit: yup.string().required(),
    price: yup.number(),
    tags: yup.array().of(yup.string()).required(),
    images: yup.array().of(yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    })).required()
  })

	const handle = async () => {
    const { factory, name, description, properties, unit, price, tags, images } = req.body
    const { subcategoryId } = req.params

    const newProduct = {
      factory,
      name: name.trim(),
      description,
      properties,
      unit,
      price,
      tags,
      images
    }

		return await productService.addProduct(subcategoryId, newProduct)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addProduct
