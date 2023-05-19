import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"

const getQuestionAndAnswer = async (req: Request, res: Response) => {
	const handle = async () => {
    const { questionAndAnswerId } = req.params

		return await siteInfoService.getQuestionAndAnswer(questionAndAnswerId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getQuestionAndAnswer
