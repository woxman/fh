import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"

const getExpert = async (req: Request, res: Response) => {
	const handle = async () => {
    const { expertId } = req.params

		return await siteInfoService.getExpert(expertId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getExpert
