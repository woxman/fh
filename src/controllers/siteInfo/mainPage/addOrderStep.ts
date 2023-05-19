import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"
import { allowedImageFormats } from '../../../utils/constants'

const addOrderStep = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    step: yup.number().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    }),
  })

	const handle = async () => {
    const { step, title, description, image } = req.body

    const orderStep = {
      step,
      title: title.trim(),
      description,
      image
    }


		return await siteInfoService.addOrderStep(orderStep)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addOrderStep
