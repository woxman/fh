import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"
import { allowedImageFormats } from '../../../utils/constants'

const editGalleryStep = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      step: yup.string(),
      link: yup.string(),
      which: yup.string(),
      image: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      }),
    }).required()
  })

	const handle = async () => {
    const { galleryStepId } = req.params

    const allowedUpdates = ["step", "link", "which", "image"]

    const galleryStepUpdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(["link"].includes(update)) {
          galleryStepUpdates[update] = req.body.updates[update].trim()
        } else {
          galleryStepUpdates[update] = req.body.updates[update]
        }
      }
    })

		return await siteInfoService.editGalleryStep(galleryStepId, galleryStepUpdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editGalleryStep
