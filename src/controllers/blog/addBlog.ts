
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import blogService from "../../db/models/blog/blog.service"
import { allowedImageFormats } from '../../utils/constants'

const addBlog = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    summary: yup.string().required(),
    author: yup.string().required(),
    content: yup.string().required(),
    show: yup.boolean().required(),
    tags: yup.array().of(yup.string()),
    category: yup.string().length(24),
    cover: yup.object({
      format: yup.string().oneOf(allowedImageFormats),
      data: yup.mixed<Buffer>()
    }),
  })

	const handle = async () => {
    const { title, summary, author, content, show, tags, category, cover } = req.body

    const newBlog = {
      title: title.trim(),
      summary,
      author: author.trim(),
      content,
      show,
      tags,
      category,
      cover
    }

		return await blogService.addBlog(newBlog)
	}

	const extractOutput = (outputs: object) => outputs

	return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default addBlog
