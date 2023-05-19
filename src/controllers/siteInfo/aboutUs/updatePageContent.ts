import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoAboutUs.service"

const updatePageContent = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    quotation: yup.object({
      content: yup.string().required(),
      name: yup.string().required(),
      role: yup.string().required(),
      image: yup.mixed<string | {
        format: 'svg' | 'png' | 'jpeg' | 'jpg'
        data: Buffer
      }>().required()
    }).required(),
    image: yup.mixed<string | {
      format: 'svg' | 'png' | 'jpeg' | 'jpg'
      data: Buffer
    }>().required()
  })

	const handle = async () => {
    const { title, content, quotation, image } = req.body

    const pageContent = {
      title: title.trim(),
      content,
      quotation,
      image
    }

		return await siteInfoService.updatePageContent(pageContent)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default updatePageContent
