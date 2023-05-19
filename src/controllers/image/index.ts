import { Router } from 'express'

import getImage from './getImage'


export const imageRouter = Router()

imageRouter.get('/:imageId', getImage)