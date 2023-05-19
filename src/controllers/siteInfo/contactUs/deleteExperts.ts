import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"

const deleteExperts = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string()).required()
  })

	const handle = async () => {
    const { idList } = req.body

		return await siteInfoService.deleteExperts(idList)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deleteExperts
