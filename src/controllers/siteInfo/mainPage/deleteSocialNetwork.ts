import { Request, Response } from 'express'

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const deleteSocialNetwork = async (req: Request, res: Response) => {
	const handle = async () => {
    const { socialNetworkId } = req.params

		return await siteInfoService.deleteSocialNetwork(socialNetworkId)
	}

	return handleRequest({ req, res, handle })
}

export default deleteSocialNetwork
