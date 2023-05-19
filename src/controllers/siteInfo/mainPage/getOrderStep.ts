import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const getOrderStep = async (req: Request, res: Response) => {
	const handle = async () => {
    const { orderStepId } = req.params

		return await siteInfoService.getOrderStep(orderStepId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getOrderStep
