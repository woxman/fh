
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import billService from "../../db/models/bill/bill.service"

const addBill = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    validUntil: yup.number().required(),
    products: yup.array().of(yup.object({
      product: yup.string().length(24).required(),
      count: yup.number().required(),
      price: yup.number().required()
    })),
    shippingCost: yup.number().required(),
    valueAddedPercentage: yup.number().min(0).max(100).required(),
    totalDiscount: yup.number().required()
  })

	const handle = async () => {
    const { orderId } = req.params
    const { validUntil, products, shippingCost, valueAddedPercentage, totalDiscount } = req.body

    const newBill = {
      validUntil,
      products,
      shippingCost,
      valueAddedPercentage,
      totalDiscount
    }

		return await billService.addBill(orderId, newBill)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addBill
