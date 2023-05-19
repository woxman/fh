
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import billService from "../../db/models/bill/bill.service"

const editBill = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    updates: yup.object({
      validUntil: yup.number(),
      products: yup.array().of(yup.object({
        product: yup.string().length(24).required(),
        count: yup.number().required(),
        price: yup.number().required()
      })),
      shippingCost: yup.number(),
      valueAddedPercentage: yup.number().min(0).max(100),
      totalDiscount: yup.number(),
    }).required()
  })

	const handle = async () => {
    const { orderId } = req.params
    
    const allowedUpdates = ['validUntil', 'products', 'shippingCost', 'valueAddedPercentage', 'totalDiscount']
    const updates: { [key: string]: any } = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        updates[update] = req.body.updates[update]
      }
    })

		return await billService.editBill(orderId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editBill
