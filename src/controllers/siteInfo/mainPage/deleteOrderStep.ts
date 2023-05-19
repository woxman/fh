import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const deleteOrderStep = async (req: Request, res: Response) => {
	const handle = async () => {
    const { orderStepId } = req.params

		return await siteInfoService.deleteOrderStep(orderStepId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteOrderStep
