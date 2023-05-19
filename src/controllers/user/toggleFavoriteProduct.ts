
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const toggleFavoriteProduct = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    productId: yup.string().length(24).required()
  })

  const handle = async () => {
    const userId = res.locals.user?._id
    const { productId } = req.body

    return await userService.toggleFavoriteProduct(userId, productId)
  }

  const extractOutput = (outputs: object) => outputs

  return handleRequest({ req, res, validationSchema, handle, extractOutput })
}

export default toggleFavoriteProduct
