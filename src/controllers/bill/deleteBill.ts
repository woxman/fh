import { Request, Response } from 'express'
import * as yup from 'yup'

import { handleRequest } from '../helper'
import billService from "../../db/models/bill/bill.service"

const deleteBill = async (req: Request, res: Response) => {

	const handle = async () => {
    const { orderId } = req.params
		return await billService.deleteBill(orderId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default deleteBill
