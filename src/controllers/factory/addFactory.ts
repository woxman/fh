
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import factoryService from "../../db/models/factory/factory.service"
import { allowedImageFormats } from '../../utils/constants'

const addFactory = async (req: Request, res: Response) => {
  
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    city: yup.string().required(),
    description: yup.string().required(),
    icon: yup.object({
      data: yup.mixed<Buffer>().required(),
      format: yup.string().oneOf(allowedImageFormats).required()
    }).required()
  })

	const handle = async () => {
    const { name, city, description, icon } = req.body

    const newFactory = {
      name: name.trim(),
      city: city.trim(),
      description,
      icon
    }

		return await factoryService.addFactory(newFactory)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addFactory
