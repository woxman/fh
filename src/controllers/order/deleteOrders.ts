import { Request, Response } from 'express'
import * as yup from 'yup'

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const deleteOrders = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string().required())
  })

  const handle = async () => {
    const { idList } = req.body
    return await orderService.deleteOrders(idList)
  }

  const extractOutput = (outputs: object) => outputs

  return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default deleteOrders
