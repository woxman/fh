
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import blogService from "../../db/models/blog/blog.service"
import { allowedImageFormats } from '../../utils/constants'

const editBlog = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    updates: yup.object({
      title: yup.string(),
      summary: yup.string(),
      author: yup.string(),
      contetnt: yup.string(),
      show: yup.boolean(),
      tags: yup.array().of(yup.string()),
      category: yup.string().length(24),
      cover: yup.object({
        format: yup.string().oneOf(allowedImageFormats),
        data: yup.mixed<Buffer>()
      }),
    }).required()
  })

	const handle = async () => {
    const { blogId } = req.params

    const allowedUpdates = ["title", "summary", "author", "content", "show", "tags", "category", "cover"]

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

		return await blogService.editBlog(blogId, pdates)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default editBlog
