
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import { allowedImageFormats } from '../../utils/constants'
import factoryService from "../../db/models/factory/factory.service"

const editFactory = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    updates: yup.object({
      name: yup.string(),
      city: yup.string(),
      description: yup.string(),
      icon: yup.object({
        data: yup.mixed<Buffer>(),
        format: yup.string().oneOf(allowedImageFormats)
      })
    }).required()
  })

	const handle = async () => {
    const { factoryId } = req.params

    const allowedUpdates = ['name', 'city', 'description', 'icon']
    const updates: { [key: string]: any } = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(['name', 'city'].includes(update)) {
          updates[update] = req.body.updates[update].trim()
        } else {
          updates[update] = req.body.updates[update]
        }
      }
    })

		return await factoryService.editFactory(factoryId, updates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editFactory
