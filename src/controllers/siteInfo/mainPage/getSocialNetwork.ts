import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const getSocialNetwork = async (req: Request, res: Response) => {
	const handle = async () => {
    const { socialNetworkId } = req.params

		return await siteInfoService.getSocialNetwork(socialNetworkId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getSocialNetwork
