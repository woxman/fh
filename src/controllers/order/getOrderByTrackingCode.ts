import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const getOrderByTrackingCode = async (req: Request, res: Response) => {

  const handle = async () => {
    const userId = res.locals.user?._id
    const { trackingCode } = req.params
    if(userId) {
      return await orderService.getOrderByTrackingCode(trackingCode, userId)
    } else {
      return await orderService.getOrderByTrackingCode(trackingCode)
    }
  }

  const extractOutput = (outputs: object) => outputs

  return handleRequest({ req, res, handle, extractOutput })
}

export default getOrderByTrackingCode
