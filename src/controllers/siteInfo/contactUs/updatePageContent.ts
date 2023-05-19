import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoContactUs.service"

const updatePageContent = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    workHours: yup.string().required(),
    image: yup.mixed<string | {
      format: 'svg' | 'png' | 'jpeg' | 'jpg'
      data: Buffer
    }>().required()
  })

	const handle = async () => {
    const { email, phone, address, workHours, image } = req.body

    const pageContent = {
      email: email.trim(),
      phone: phone.trim(),
      address,
      workHours,
      image
    }

		return await siteInfoService.updatePageContent(pageContent)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default updatePageContent
