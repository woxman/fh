
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import pageService from "../../db/models/page/page.service"
import { allowedImageFormats } from '../../utils/constants'

const editPage = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object({
      title: yup.string(),
      summary: yup.string(),
      author: yup.string(),
      contetnt: yup.string(),
      show: yup.boolean(),
      tags: yup.array().of(yup.string()),
      categorys: yup.array().of(yup.string()),
      cover: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      }),
    }).required()
  })

	const handle = async () => {
    const { pageId } = req.params

    const allowedUpdates = ["title", "summary", "author", "content", "show", "tags", "categorys", "cover"]

    const pdates: { [key: string]: any} = {}

    Object.keys(req.body.updates || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        
        if(["title", "author"].includes(update)) {
          pdates[update] = req.body.updates[update].trim()

        } else {
          pdates[update] = req.body.updates[update]
        }
      }
    })

		return await pageService.editPage(pageId, pdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editPage
