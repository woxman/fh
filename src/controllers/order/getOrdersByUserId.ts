import * as yup from 'yup'
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const getOrdersByUserId = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(['name', 'unit', 'price', 'createdAt', 'updatedAt']),
    sortOrder: yup.string().oneOf(['asc', 'desc'])
  })

  const handle = async () => {
    const userId = res.locals.user?._id || req.params.userId
    const { limit, skip, sortBy, sortOrder } = req.query

    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString()
    }

    return await orderService.getOrdersByUserId(userId, options)
  }

  const extractOutput = (outputs: object) => outputs

  return handleRequest({ req, res, queryValidationSchema, handle, extractOutput })
}

export default getOrdersByUserId
