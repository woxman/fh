import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"
import { allowedImageFormats } from '../../../utils/constants'

const updateLogo = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    logo: yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    }),
  })

	const handle = async () => {
    const { logo } = req.body

		return await siteInfoService.updateLogo(logo)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default updateLogo
