
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const editOrder = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    updates: yup.object({
      status: yup.number().oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
      products: yup.array().of(yup.object({
        product: yup.string().length(24),
        count: yup.number(),
        stockStatus: yup.object({
          enoughInStock: yup.boolean(),
          numberLeftInStock: yup.number(),
          alternativeProduct: yup.string().length(24)
        })
      })),
      phoneNumber: yup.string(),
      address: yup.string(),
      fullNameOfReceiverParty: yup.string(),
      accountNumber: yup.string(),
      fullNameOfAccountOwner: yup.string(),
      shabaNumber: yup.string(),
      shippingDates: yup.array().of(yup.number()),
      shippingDate: yup.number()
    }).required()
  })

	const handle = async () => {
    const userId = res.locals.user?._id
    const { orderId } = req.params
    
    const allowedUpdates = res.locals.user ? [
      'phoneNumber',
      'address',
      'fullNameOfReceiverParty',
      'accountNumber',
      'fullNameOfAccountOwner',
      'shabaNumber',
      'shippingDate'
    ] : ['status', 'products', 'shippingDates']
    const updates: { [key: string]: any } = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        updates[update] = req.body.updates[update]
      }
    })

    if(userId) {
		  return await orderService.editOrder(orderId, updates, userId)
    } else {
		  return await orderService.editOrder(orderId, updates)
    }
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editOrder
