import Admin, { IAdmin } from "./admin"
import SiteInfo from "../siteInfo/siteInfo"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages, websiteName } from "../../../utils/constants"
import { encrypt, decrypt } from "../../../utils/helpers/encryption"
import { generateToken } from "../../../utils/helpers/token"
import mongoose, { ObjectId as objectId } from "mongoose"
import Report from "../report/report"
const ObjectId = mongoose.Types.ObjectId

const addAdmin = async (
  currentAdminIsGodAdmin: boolean,
  newAdmin: {
    isSuperAdmin: boolean
    email: string
    password: string
    phone: string
    name: string
    permissions: string[]
  },
  reportDetails: {
    adminId: objectId
    ip: string 
  }
): Promise<IResponse> => {

  try {
    const { isSuperAdmin, email, password, phone, name, permissions } = newAdmin
    const { adminId, ip } = reportDetails

    // checking godAdmin permissions
    if(!currentAdminIsGodAdmin && isSuperAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminRoleRequired,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking email availability
    const existingAdminWithThisEmail = await Admin.findOne({ email }).exec()

    if(existingAdminWithThisEmail) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.emailAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking phone availability
    const existingAdminWithThisPhone = await Admin.findOne({ phone }).exec()

    if(existingAdminWithThisPhone) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.phoneAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const createdAdmin = await Admin.create({
      isSuperAdmin,
      email,
      password: encrypt(password),
      phone,
      name,
      permissions
    })

    await Report.create({
      admin: adminId,
      ip,
      event: 'createAdmin',
      createdAdmin
    })

    return {
      success: true,
      outputs: {
        admin: createdAdmin
      }
    }
  } catch(error) {
    console.log('Error while creating new admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------

const createGodAdmin = async (
  godAdmin: {
    isGodAdmin: boolean,
    email: string,
    password: string,
    phone: string,
    name: string
  }
  ): Promise<IResponse> => {

  try {
    // checking godAdmin existence
    const existingGodAdmin = await Admin.findOne({ isGodAdmin: true }).exec()
    if(existingGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminAlreadyExists,
          statusCode: statusCodes.badRequest
        }
      }
    }

    godAdmin.password = encrypt(godAdmin.password)

    const createdGodAdmin = await Admin.create(godAdmin)

    await SiteInfo.create({ websiteName })
    
    return {
      success: true,
      outputs: {
        godAdmin: createdGodAdmin
      }
    }
  } catch(error) {
    console.log('Error while creating new admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//------------------------------------------------

const login = async (
  email: string, 
  password: string,
  reportDetails: {
    ip: string 
  }
): Promise<IResponse> => {
  try {
    const { ip } = reportDetails
    const admin = await Admin.findOne({ email }).exec()
    
    if(!admin || password !== decrypt(admin.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.incorrectCredentials,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const token = generateToken(admin._id, "admin")

    await Admin.findByIdAndUpdate(admin._id, { $push: { tokens: token }}).exec()
    await Report.create({
      admin: admin._id,
      ip,
      event: 'login'
    })

    return {
      success: true,
      outputs: {
        admin,
        token
      }
    }

  } catch(error) {
    console.log('Error while logging in: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-----------------------------------------------------------

const logout = async (
  token: string,
  reportDetails: {
    adminId: objectId
    ip: string 
  }
): Promise<IResponse> => {
  try {
    // popping old token from tokens list
    const { adminId, ip } = reportDetails
    await Admin.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token }}).exec()
    await Report.create({
      admin: adminId,
      ip,
      event: 'logout'
    })

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while logging out: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------------------------

const forgetPassword = async (email: string): Promise<IResponse> => {
  try {
    const admin = await Admin.findOne({ email }).exec()

    if(!admin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.emailNotFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    // TODO: send an email

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while loging out: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------------------------

const changePassword = async (adminId: string, newPassword: string): Promise<IResponse> => {
  try {

    await Admin.findByIdAndUpdate(adminId, { $set: { password: encrypt(newPassword) }}).exec()

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while changing password: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------------------------

const getAdmin = async (adminId: string): Promise<IResponse> => {
  try {
    const admin = await Admin.findById(adminId)

    if(!admin) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        admin
      }
    }

  } catch(error) {
    console.log('Error while getting admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------

const editAdmin = async (
  adminId: string,
  adminUpdates: {
    isSuperAdmin?: string
    email?: string
    phone?: string
    name?: string
    permissions?: string[]
  },
  currentAdminIsGodAdmin: boolean
): Promise<IResponse> => {

  try {

    // checking adminUpdates object to not be empty
    if(Object.keys(adminUpdates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking godAdmin permissions
    if('isSuperAdmin' in adminUpdates && !currentAdminIsGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminRoleRequired,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking email availability
    if(adminUpdates.email) {
      const existingAdminWithThisEmail = await Admin.findOne({ email: adminUpdates.email }).exec()

      if(existingAdminWithThisEmail) {
        return {
          success: false,
          error: {
            message: errorMessages.adminService.emailAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // checking phone availability
    if(adminUpdates.phone) {
      const existingAdminWithThisPhone = await Admin.findOne({ phone: adminUpdates.phone }).exec()
    
      if(existingAdminWithThisPhone) {
        return {
          success: false,
          error: {
            message: errorMessages.adminService.phoneAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, adminUpdates, { new: true }).exec()

    if(!updatedAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.badRequest
        }
      }
    }

    return {
      success: true,
      outputs: {
        admin: updatedAdmin
      }
    }
  } catch(error) {
    console.log('Error while updating an admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------

const editCurrentAdmin = async (
  adminId: string,
  adminUpdates: {
    email?: string
    phone?: string
    name?: string
  }
): Promise<IResponse> => {

  try {

    // checking adminUpdates object to not be empty
    if(Object.keys(adminUpdates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking email availability
    if(adminUpdates.email) {
      const existingAdminWithThisEmail = await Admin.findOne({ email: adminUpdates.email }).exec()

      if(existingAdminWithThisEmail) {
        return {
          success: false,
          error: {
            message: errorMessages.adminService.emailAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // checking phone availability
    if(adminUpdates.phone) {
      const existingAdminWithThisPhone = await Admin.findOne({ phone: adminUpdates.phone }).exec()
    
      if(existingAdminWithThisPhone) {
        return {
          success: false,
          error: {
            message: errorMessages.adminService.phoneAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, adminUpdates, { new: true }).exec()

    if(!updatedAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        admin: updatedAdmin
      }
    }
  } catch(error) {
    console.log('Error while updating current admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------------------------------

const deleteAdmins = async (
  currentAdminIsGodAdmin: boolean, 
  idList: string[],
  reportDetails: {
    adminId: objectId
    ip: string 
  }  
): Promise<IResponse> => {
  try {
    const filter = {
      _id : { $in: idList },
      isGodAdmin: false
    }
    const { adminId, ip } = reportDetails

    const admins = await Admin.find(filter)

    const isSuperAdminInAdmins = !admins.every((admin) => {
      return admin.isSuperAdmin === false
    })

    // checking godAdmin permissions
    if(!currentAdminIsGodAdmin && isSuperAdminInAdmins) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminRoleRequired,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // deleting admins
    for(const admin of admins) {
      const deletedAdmin = await Admin.findByIdAndDelete(admin._id).exec()
      if(deletedAdmin) {
        await Report.create({
          admin: adminId,
          ip,
          event: 'deleteAdmin',
          deletedAdmin: deletedAdmin.name
        })
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting admins: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------------------------

const getAdmins = async (
  options: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string
  }
): Promise<IResponse> => {
  try {

    const { limit, skip, sortBy, sortOrder, search } = options

    // Create and fill the query options object
    const queryOptions: { [key: string]: any } = {}
    
    if(limit) {
      queryOptions['limit'] = limit
    }

    if(skip) {
      queryOptions['skip'] = skip
    }

    if(sortBy) {
      queryOptions['sort'] = {}
      queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc'
    }

    const filter: { [key: string]: any } = {}
    if(search) {
      filter.name = { $regex: search }
    }
    
    // Fetch the admins
    const count = await Admin.countDocuments(filter)
    const admins = await Admin.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        admins
      }
    }

  } catch(error) {
    console.log('Error while getting admins: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------------------------

export default {
  addAdmin,
  createGodAdmin,
  login,
  logout,
  getAdmins,
  getAdmin,
  editAdmin,
  editCurrentAdmin,
  deleteAdmins,
  forgetPassword,
  changePassword
}