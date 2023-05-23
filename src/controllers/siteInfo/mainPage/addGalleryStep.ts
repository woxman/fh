import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"
import { allowedImageFormats } from '../../../utils/constants'

const addGalleryStep = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    step: yup.number().required(),
    link: yup.string(),
    which: yup.string().required(),
    image: yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    }),
  })

	const handle = async () => {
    const { step, link, which, image } = req.body

    const galleryStep = {
      step,
      link,
      which,
      image
    }


		return await siteInfoService.addGalleryStep(galleryStep)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addGalleryStep
