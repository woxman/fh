
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import billService from "../../db/models/bill/bill.service"
import { allowedImageFormats } from '../../utils/constants'

const updateBankPayment = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    paidAmount: yup.number().required(),
    originAccount: yup.string().required(),
    trackingNumber: yup.string().required(),
    images: yup.array().of(yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    })).required(),
  })

	const handle = async () => {
    const userId = res.locals.user._id
    const { orderId } = req.params
    const { paidAmount, originAccount, trackingNumber, images } = req.body

    const bankPayment = {
      paidAmount,
      originAccount,
      trackingNumber,
      images
    }

		return await billService.updateBankPayment(userId, orderId, bankPayment)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default updateBankPayment
