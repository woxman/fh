import User, { IUser } from "./user"
import Product from "../product/product"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import { generateToken } from "../../../utils/helpers/token"
import { sendCode } from "../../../utils/helpers/sms"
import mongoose, { ObjectId as objectId } from "mongoose"
import Report from "../report/report"
const ObjectId = mongoose.Types.ObjectId


const addUser = async (
  newUser: {
    phone: string
    email: string
    name: string    
    addresses: string[]
    postCode: string
    shSabtMelli: string
    shEghtasadi: string
  },
  reportDetails: {
    adminId: objectId
    ip: string 
  }
): Promise<IResponse> => {

  try {
    const { phone, email, name, addresses, postCode, shSabtMelli, shEghtasadi} = newUser
    const { adminId, ip } = reportDetails

    // checking email availability
    const existingUserWithThisEmail = await User.findOne({ email }).exec()

    if(existingUserWithThisEmail) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.emailAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking phone availability
    const existingUserWithThisPhone = await User.findOne({ phone }).exec()

    if(existingUserWithThisPhone) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.phoneAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const lastUser = await User.find({}).sort({_id: -1}).limit(1).exec();
    const lastUserCode = parseInt(lastUser[0]['code'])+1;
    const createdUser = await User.create({
      phone,
      email,
      name,
      postCode,
      shSabtMelli,
      shEghtasadi,
      addresses,
      code:lastUserCode
    })

    await Report.create({
      admin: adminId,
      ip,
      event: 'createUser',
      createdUser
    })

    return {
      success: true,
      outputs: {
        user: createdUser
      }
    }
  } catch(error) {
    console.log('Error while creating new user: ', error)

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

const addUsers = async (
  newUser: {
    phone: string[]
    email: string[]
    name: string[]    
    addresses: string[]
  },
  reportDetails: {
    adminId: objectId
    ip: string 
  }
): Promise<IResponse> => {

  try {
    const { phone, email, name, addresses} = newUser
    const { adminId, ip } = reportDetails    
    let isExistEmail=false;
    let isExistPhone=false;

    await email.forEach(async function callback(value, index) {
      // checking email availability
      console.log("Email");
      console.log(value);
      console.log("Email");
      const existingUserWithThisEmail = await User.findOne({ email:value }).exec()
      if(existingUserWithThisEmail) {
        isExistEmail=true;
      }
	  });
    if(isExistEmail) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.emailsAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    await phone.forEach(async function callback(value, index) {
      console.log("phone");
      console.log(phone);
      console.log("phone");
      // checking phone availability
      const existingUserWithThisPhone = await User.findOne({ phone:value }).exec()
      if(existingUserWithThisPhone) {
        isExistPhone=true;
      }
	  });
    if(isExistPhone) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.phonesAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    let createdUsersList;
    await phone.forEach(async function callback(value, index) {
      const lastUser = await User.find({}).sort({createdAt: -1}).limit(1).exec();
      const lastUserCode = parseInt(lastUser[0]['code'])+1;
      const createdUser = await User.create({
        phone:phone[index],
        email:email[index],
        name:name[index],
        addresses:addresses[index],
        code:lastUserCode
      })
      console.log(createdUser);
      await Report.create({
        admin: adminId,
        ip,
        event: 'createUsers',
        createdUser
      })
      createdUsersList.push(createdUser);
	  });    

    return {
      success: true,
      outputs: {
        user: createdUsersList
      }
    }
  } catch(error) {
    console.log('Error while creating new users list: ', error)

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

const sendLoginCode = async (phone: string): Promise<IResponse> => {
  try {
    const user = await User.findOne({phone}).exec()

    const loginCode = {
      code: Math.floor(1000 + Math.random() * 9000),
      expiresAt: new Date().getTime() + 300000
    }

    if(!user) {
      // Creating new user
      const lastUser = await User.find({}).sort({createdAt: -1}).limit(1).exec();
      const lastUserCode = parseInt(lastUser[0]['code'])+1;
      const newUser = {
        phone,
        loginCode,
        code:lastUserCode
      }
      await User.create(newUser)

    } else {
      // Updating login code of existing user
      await User.findByIdAndUpdate(user._id, { $set: { loginCode }}).exec()
    }

    await sendCode(phone, loginCode.code)

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while sending login code: ', error)

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

const login = async (phone: string, code: string): Promise<IResponse> => {
  try {
    const user = await User.findOne({phone}).exec()

    if(!user) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.phoneNotFound,
          statusCode: statusCodes.badRequest
        }
      }
    }

    if(code !== user.loginCode.code) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.incorrectLoginCode,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const isTokenExpired = new Date().getTime() > user.loginCode.expiresAt

    if(isTokenExpired) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.loginCodeExpired,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const token = generateToken(user._id, "user")

    await User.findByIdAndUpdate(user._id, { $push: { tokens: token }})
      .populate({
        path: 'favoriteProducts',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      }).exec()

    return {
      success: true,
      outputs: {
        user,
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

const logout = async (token: string): Promise<IResponse> => {
  try {
    // popping old token from tokens list
    await User.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token }}).exec()

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

//--------------------------------------------------

const getUser = async (userId: string): Promise<IResponse> => {
  try {
    console.log("*********************")
    console.log(userId)
    console.log("*********************")
    const user = await User.findById(userId)
      .populate({
        path: 'favoriteProducts',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      }).exec()

    if(!user) {
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
        user
      }
    }

  } catch(error) {
    console.log('Error while getting user: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------

const getUsers = async (
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
    
    // Fetch the users
    const count = await User.countDocuments(filter)
    const users = await User.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        users
      }
    }

  } catch(error) {
    console.log('Error while getting users: ', error)

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


const toggleFavoriteProduct = async (userId: string, productId: string): Promise<IResponse> => {
  try {
    // Make sure the user exists
    const user = await User.findById(userId).exec()
    if(!user) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    // Make sure the product exists
    const product = await Product.findById(productId).exec()
    if(!product) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    if(!user.favoriteProducts.includes(product._id)) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          favoriteProducts: product._id
        }
      }).exec()
    } else {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          favoriteProducts: product._id
        }
      }).exec()
    }

    return  {
      success: true
    }
  } catch(error) {
    console.log('Error while adding the favorite product: ', error)

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

const editUser = async (
  userId: string,
  updates: {
    name?: string
    email?: string
    postCode?: string
    shSabtMelli?: string
    shEghtasadi?: string
    addresses?: string[]
  }
): Promise<IResponse> => {

  try {
    // checking userUpdates object to not be empty
    if(Object.keys(updates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking email availability
    if(updates.email) {
      const existingUserWithThisEmail = await User.findOne({ email: updates.email }).exec()

      if(existingUserWithThisEmail) {
        return {
          success: false,
          error: {
            message: errorMessages.userService.emailAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true })
      .populate({
        path: 'favoriteProducts',
        populate: [
          {
            path: 'subcategory',
            select: '_id name'
          },
          {
            path: 'factory',
            select: '_id name'
          }
        ]
      }).exec()

    if(!updatedUser) {
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
        user: updatedUser
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

const deleteUser = async (userId: string): Promise<IResponse> => {
  try {
    // TODO: delete user orders
    await User.findByIdAndDelete(userId)

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting user: ', error)

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


const deleteUsers = async (
  idList: string[],
  reportDetails: {
    adminId: objectId
    ip: string 
  }  
): Promise<IResponse> => {
  try {
    const filter = {
      _id : { $in: idList },
    }
    const { adminId, ip } = reportDetails

    const users = await User.find(filter)

    // deleting users
    for(const user of users) {
      const deletedUser = await User.findByIdAndDelete(user._id).exec()
      if(deletedUser) {
        await Report.create({
          admin: adminId,
          ip,
          event: 'deleteUser',
          deletedUser: deletedUser.name
        })
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting users: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}


export default {
  addUser,
  addUsers,
  getUsers,
  sendLoginCode,
  login,
  logout,
  getUser,
  editUser,
  toggleFavoriteProduct,
  deleteUser,
  deleteUsers,
}