import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
import Factory from './factory'
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import imageService from '../image/image.service'
import productService from '../product/product.service'
import Subcategory from '../subcategory/subcategory'
import Product from '../product/product'
import { factory } from 'typescript'

const addFactory = async (
  newFactory: { 
    name: string
    city: string
    description: string
    icon: {
      format: string
      data: Buffer 
    }
  }
): Promise<IResponse> => {
  try {
    const { name, city, description, icon } = newFactory

    // Checking for availability
    const existingFactory = await Factory.findOne({ name }).exec()
    if(existingFactory) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.nameMustBeUnique
        }
      }
    }

    // Saving the image in the database
    const result = await imageService.storeImage(icon.format, icon.data)
    if(!result.success) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.ise,
          message: errorMessages.shared.ise
        }
      }
    }
    const iconUrl = result.imageUrl

    // Creating the new factory
    const addedFactory = await Factory.create({
      name,
      city,
      description,
      icon: iconUrl
    })

    return {
      success: true,
      outputs: {
        factory: addedFactory
      }
    }

  } catch(error) {
    console.log('Error while creating the new factory: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getFactory = async (factoryId: string): Promise<IResponse> => {
  try {
    // Find and return the factory
    const factory = await Factory.findById(factoryId).exec()
    if(!factory) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    return {
      success: true,
      outputs: { factory }
    }

  } catch(error) {
    console.log('Error while getting the factory: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getFactories = async (
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
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

    // Fetch the factories
    const count = await Factory.countDocuments(filter)
    let factories = await Factory.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        factories
      }
    }

  } catch(error) {
    console.log('Error while getting the factories: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getFactoriesBySubcategoryId = async (subcategoryId: string): Promise<IResponse> => {
  try {
    // Checking if subcategory exists
    const subcategory = await Subcategory.findById(subcategoryId).exec()
    if(!subcategory) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    const factories: {
      _id: string
      name: string
    }[] = []
  
    const products = await Product.find({ subcategory: subcategoryId }, { _id: 1, factory: 1 })
      .populate('factory', '_id name').exec()

    products.forEach((product) => {
      const factoryExistsInList = factories.find((factory) => {
        if(!('_id' in product.factory)) return // This is for ts type error

        if(factory._id == product.factory._id.toString()) {
          return true
        }
      })
      if(!factoryExistsInList) {
        if(!('_id' in product.factory)) return // This is for ts type error

        factories.push({
          _id: product.factory._id.toString(),
          name: product.factory.name
        })
      }
    })

    return {
      success: true,
      outputs: {
        factories
      }
    }

  } catch(error) {
    console.log('Error while getting the factories by subcategoryId: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const editFactory = async (
  factoryId: string, 
  updates: { 
    name?: string
    city?: string
    description?: string
    icon?: {
      format: string
      data: Buffer
    } 
  }
): Promise<IResponse> => {
  try {
    // Make sure the record exists
    const factory = await Factory.findById(factoryId).exec()
    if(!factory) {
      return {
        success:false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    // Make sure there are changes in updates
    if((Object.keys(updates)).length === 0) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.noChanges
        }
      }
    }

    // Checking for availability
    if(updates.name) {
      const { name } = updates
      const existingFactory = await Factory.findOne({ name }).exec()
      if(existingFactory) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.shared.nameMustBeUnique
          }
        }
      }
    }

    // Store the new image in database
    if(updates.icon) {
      const result = await imageService.updateImage(factory.icon, updates.icon.format, updates.icon.data)
      if(!result.success) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.ise,
            message: errorMessages.shared.ise
          }
        }
      }

      delete updates.icon
    }

    // Update the factory
    const updatedFactory = await Factory.findByIdAndUpdate(factoryId, updates, { new: true }).exec()
    return {
      success: true,
      outputs: {
        factory: updatedFactory
      }
    }

  } catch(error) {
    console.log('Error while updating the factory: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const deleteFactories = async (idList: string): Promise<IResponse> => {
  try {
    for(const id of idList) {
      // Find and delete the factory
      const deletedFactory = await Factory.findByIdAndDelete(id).exec()
      if(deletedFactory) {
        // Delete the potential icon
        await imageService.deleteImage(deletedFactory.icon)
        
        // Removing all the products with this factory
        const productIds = deletedFactory.products.map((product) => product._id.toString())
        await productService.deleteProducts(productIds)
      }
    }

    return {
      success: true
    }
    
  } catch(error) {
    console.log('Error while deleting the factories: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

export default {
  addFactory,
  getFactory,
  getFactories,
  getFactoriesBySubcategoryId,
  editFactory,
  deleteFactories
}