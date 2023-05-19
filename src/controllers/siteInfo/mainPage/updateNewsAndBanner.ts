import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const updateNewsAndBanner = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    news: yup.string().required(),
    banner: yup.mixed<string | {
      format: 'svg' | 'png' | 'jpeg' | 'jpg'
      data: Buffer
    }>().required()
  })

	const handle = async () => {
    const { news, banner } = req.body

    const newsAndBanner = {
      news,
      banner
    }

		return await siteInfoService.updateNewsAndBanner(newsAndBanner)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default updateNewsAndBanner
