import Property from './property'
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import Subcategory from '../subcategory/subcategory'
import Product from '../product/product'

const addProperty = async (
  newProperty: { 
    name: string
    values: string[]
  }
): Promise<IResponse> => {
  try {
    const { name, values } = newProperty
    // Checking for availability
    const existingProperty = await Property.findOne({ name }).exec()
    if(existingProperty) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.nameMustBeUnique
        }
      }
    }

    // Creating the new property
    const addedProperty = await Property.create({ name, values })

    return {
      success: true,
      outputs: {
        property: addedProperty
      }
    }

  } catch(error) {
    console.log('Error while creating the new property: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

//----------------------------------------------------------------------------

const getProperty = async (propertyId: string): Promise<IResponse> => {
  try {
    // Find and return the property
    const property = await Property.findById(propertyId).exec()
    if(!property) {
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
      outputs: {
        property
      }
    }

  } catch(error) {
    console.log('Error while getting the property: ', error)
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

const getProperties = async (
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

    // Fetch the properties
    const count = await Property.countDocuments(filter)
    let properties = await Property.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        properties
      }
    }

  } catch(error) {
    console.log('Error while getting the properties: ', error)
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

const editProperty = async (
  propertyId: string, 
  updates: { 
    name?: string
    values?: string[]
  }
): Promise<IResponse> => {
  try {
    // Make sure the record exists
    const property = await Property.findById(propertyId).exec()
    if(!property) {
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
      const existingProperty = await Property.findOne({ name }).exec()
      if(existingProperty) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.shared.nameMustBeUnique
          }
        }
      }
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, updates, { new: true }).exec()

    if(updates.name) {
      // Updating property name in products that have this property
      const filter = {
        'properties.name': property.name
      }
      const products = await Product.find(filter, { _id: 1 }).exec()
      for(const product of products) {
        const update = {
          'properties.$[i].name': updates.name
        }
        const arrayFilters = [{'i.name': property.name}]
        await Product.findByIdAndUpdate(product._id, update, { arrayFilters }).exec()
      }
    }

    return {
      success: true,
      outputs: {
        property: updatedProperty
      }
    }

  } catch(error) {
    console.log('Error while updating the property: ', error)
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

const deleteProperties = async (idList: string[]): Promise<IResponse> => {
  try {
    for(const id of idList) {
      // Find and delete the property
      const deletedProperty = await Property.findByIdAndDelete(id).exec()

      if(deletedProperty) {
        // Find subcategories that have deleted property
        const filter = {
          'properties.property': deletedProperty._id
        }
        const subcategories = await Subcategory.find(filter)
          .populate('products', '_id').exec()

        for(const subcategory of subcategories) {
          // Deleting the deleted property from subcategories
          const subcategoryUpdate = {
            $pull: {
              properties: {
                property: deletedProperty._id
              }
            }
          }
          await Subcategory.findByIdAndUpdate(subcategory._id, subcategoryUpdate)

          for(const product of subcategory.products) {
            // Deleting the deleted property from products
            const productUpdate = {
              $pull: {
                properties: {
                  name: deletedProperty.name
                }
              }
            }
            await Product.findByIdAndUpdate(product._id, productUpdate)
          }
        }
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting the properties: ', error)
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
  addProperty,
  getProperties,
  getProperty,
  editProperty,
  deleteProperties
}