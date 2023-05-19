import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import propertyService from "../../db/models/property/property.service"

const getProperty = async (req: Request, res: Response) => {

	const handle = async () => {
    const { propertyId } = req.params
		return await propertyService.getProperty(propertyId)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, handle, extractOutput })
}

export default getProperty
