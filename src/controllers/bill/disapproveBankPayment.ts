
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import billService from "../../db/models/bill/bill.service"

const disapproveBankPayment = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    disapprovalMessage: yup.string().required(),
  })

	const handle = async () => {
    const { orderId } = req.params
    const { disapprovalMessage } = req.body

		return await billService.disapproveBankPayment(orderId, disapprovalMessage)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default disapproveBankPayment
