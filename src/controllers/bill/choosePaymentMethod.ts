import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import billService from "../../db/models/bill/bill.service"

const choosePaymentMethod = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    paymentMethod: yup.string().oneOf(['online', 'bank']).required()
  })

	const handle = async () => {
    const userId = res.locals.user._id
    const { orderId } = req.params
    const { paymentMethod } = req.body

		return await billService.choosePaymentMethod(userId, orderId, paymentMethod)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default choosePaymentMethod
