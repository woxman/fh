
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const addOrder = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    products: yup.array().of(yup.object({
      product: yup.string().length(24).required(),
      count: yup.number().required()
    })).required(),
    phoneNumber: yup.string().required(),
    address: yup.string().required(),
    fullNameOfReceiverParty: yup.string().required(),
    accountNumber: yup.string().required(),
    fullNameOfAccountOwner: yup.string().required(),
    shabaNumber: yup.string()
  })

  const handle = async () => {
    const {
      products,
      phoneNumber,
      address,
      fullNameOfReceiverParty,
      accountNumber,
      fullNameOfAccountOwner,
      shabaNumber
    } = req.body
    const userId = res.locals.user?._id

    const newOrder = {
      products,
      phoneNumber,
      address,
      fullNameOfReceiverParty,
      accountNumber,
      fullNameOfAccountOwner,
      shabaNumber
    }

    return await orderService.addOrder(userId, newOrder)
  }

  const extractOutput = (outputs: object) => outputs

  return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addOrder
