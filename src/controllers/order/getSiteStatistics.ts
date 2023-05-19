import * as yup from 'yup'
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const getSiteStatistics = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    startOfTheYear: yup.string().required()
  })

  const handle = async () => {
    const startOfTheYear = Number(req.query.startOfTheYear)
    return await orderService.getSiteStatistics(startOfTheYear)
  }

  const extractOutput = (outputs: object) => outputs

  return handleRequest({ req, res, queryValidationSchema, handle, extractOutput })
}

export default getSiteStatistics
