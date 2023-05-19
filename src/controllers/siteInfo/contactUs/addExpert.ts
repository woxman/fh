import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"
import { allowedImageFormats } from '../../../utils/constants'

const addExpert = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().required(),
    category: yup.string().length(24).required(),
    socialNetworks: yup.array().of(yup.object({
      name: yup.string().required(),
      link: yup.string().required(),
      icon: yup.string().required()
    })).required(),
    image: yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    }),
  })

	const handle = async () => {
    const { name, phone, category, socialNetworks, image } = req.body

    const expert = {
      name: name.trim(),
      phone: phone.trim(),
      category,
      socialNetworks,
      image
    }

		return await siteInfoService.addExpert(expert)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addExpert
