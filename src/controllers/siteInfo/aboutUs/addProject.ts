import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoAboutUs.service"
import { allowedImageFormats } from '../../../utils/constants'

const addProject = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.object({
      format: yup.string().oneOf(allowedImageFormats).required(),
      data: yup.mixed<Buffer>().required()
    }),
  })

	const handle = async () => {
    const { title, description, image } = req.body

    const project = {
      title: title.trim(),
      description,
      image,
    }

		return await siteInfoService.addProject(project)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addProject
