import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"
import { allowedImageFormats } from '../../../utils/constants'

const editExpert = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      name: yup.string(),
      phone: yup.string(),
      category: yup.string().length(24),
      socialNetworks: yup.array().of(yup.object({
        name: yup.string(),
        link: yup.string(),
        icon: yup.string()
      })).required(),
      image: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      }),
    }).required()
  })

	const handle = async () => {
    const { expertId } = req.params

    const allowedUpdates = ["name", "phone", "category", "socialNetworks", "image"]

    const expertUpdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {

        if(["name", "phone"].includes(update)) {
          expertUpdates[update] = req.body.updates[update].trim()

        } else {
          expertUpdates[update] = req.body.updates[update]
        }
      }
    })


		return await siteInfoService.editExpert(expertId, expertUpdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editExpert
