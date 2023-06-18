import { Request, Response } from "express"
import { ObjectId as objectId } from "mongoose"
import jwt from 'jsonwebtoken'

import Admin from "../db/models/admin/admin"
import User from "../db/models/user/user"
import { statusCodes, errorMessages } from "../utils/constants"
import config from '../utils/config'

const auth = (role: 'admin' | 'user') => {
  return async (req: Request, res: Response, next: Function) => {

    const token = req.header('Authorization')?.replace('Bearer ', '') as string
    try {
      interface IDecodedToken {
        role: string,
        id: objectId
      }
      const decodedToken = jwt.verify(token, config.jwtSecret) as IDecodedToken

      if(decodedToken.role !== role) {
        return res.status(statusCodes.unauthorized).send({ message: errorMessages.shared.unauthorized })
      }
      
      if(decodedToken.role === "user") {
        const user = await User.findOne({_id: decodedToken.id, tokens: token }).exec()
        if(!user) {
          return res.status(statusCodes.unauthorized).send({ message: errorMessages.shared.unauthorized })
        }
        res.locals.user = {
          _id: user._id
        }
  
      } else if(decodedToken.role === "admin") {
        const admin = await Admin.findOne({_id: decodedToken.id, tokens: token }).exec()
        if(!admin) {
          return res.status(statusCodes.unauthorized).send({ message: errorMessages.shared.unauthorized })
        }
        res.locals.admin = {
          _id: admin._id,
          isGodAdmin: admin.isGodAdmin,
          code: admin.code,
          permissions: admin.permissions
        }
      }
  
      next()
    } catch(error) {
      console.log('Error while verifying token: ', error)
      // delete expired token
      if((error as Error).name === "TokenExpiredError") {
        console.log('Deleting expired token')
        await Admin.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token }}).exec()
        await User.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token }}).exec()
      }
      res.status(statusCodes.unauthorized).send({ message: errorMessages.shared.unauthorized })
    }
  }
}

// const auth = 

export default auth