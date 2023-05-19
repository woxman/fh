import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const getSocialNetworks = async (req: Request, res: Response) => {
	const handle = async () => {

		return await siteInfoService.getSocialNetworks()
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getSocialNetworks
