import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const getOrder = async (req: Request, res: Response) => {

  const handle = async () => {
    const userId = res.locals.user?._id
    const { orderId } = req.params
    if(userId) {
      return await orderService.getOrder(orderId, userId)
    } else {
      return await orderService.getOrder(orderId)
    }
  }

  const extractOutput = (outputs: object) => outputs

  return handleRequest({ req, res, handle, extractOutput })
}

export default getOrder
