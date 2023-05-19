import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../../helper'
import siteInfoService from "../../../db/models/siteInfo/siteInfoAboutUs.service"
import { allowedImageFormats } from '../../../utils/constants'

const editProject = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object().shape({
      title: yup.string(),
      description: yup.string(),
      image: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      }),
    }).required()
  })

	const handle = async () => {
    const { projectId } = req.params

    const allowedUpdates = ["title", "description", "image"]

    const projectUpdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        
        if(["title"].includes(update)) {
          projectUpdates[update] = req.body.updates[update].trim()

        } else {
          projectUpdates[update] = req.body.updates[update]
        }
      }
    })


		return await siteInfoService.editProject(projectId, projectUpdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editProject
