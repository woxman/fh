import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoMainPage.service"

const updateFooter = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    content: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    workHours: yup.string().required(),
    images: yup.array().of(yup.mixed<string | {
      format: 'svg' | 'png' | 'jpeg' | 'jpg'
      data: Buffer
    }>()).required()
  })

	const handle = async () => {
    const { content, email, phone, address, workHours, images } = req.body

    const footer = {
      content,
      email: email.trim(),
      phone: phone.trim(),
      address,
      workHours,
      images
    }

		return await siteInfoService.updateFooter(footer)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default updateFooter
