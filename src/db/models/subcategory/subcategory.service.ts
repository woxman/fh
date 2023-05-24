import Subcategory from './subcategory'
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import Category from '../category/category'
import Property from '../property/property'
import Product from '../product/product'
import productService from '../product/product.service'

const addSubcategory = async (
  categoryId: string, 
  newSubcategory: {
    name: string
    urlSlug: string,
    code: string,
    description: string
    properties: {
      property: string
      order: number
    }[]
  }
): Promise<IResponse> => {
  try {
    const { name, urlSlug,code, description, properties } = newSubcategory

    // Checking for availability
    const subcategoryWithExistingName = await Subcategory.findOne({ name }).exec()
    if(subcategoryWithExistingName) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.nameMustBeUnique
        }
      }
    }

    const subcategoryWithExistingSlug = await Subcategory.findOne({ urlSlug }).exec()
    if(subcategoryWithExistingSlug) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.slugMustBeUnique
        }
      }
    }

    // Check if the category exists
    const category = await Category.findById(categoryId).exec()
    if(!category) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    // Check if all the properties exist
    let allPropertiesExist = true

    for (const item of properties) {
      const propertyExist = await Property.findById(item.property).exec()
      if(!propertyExist) {
        allPropertiesExist = false
        break
      }
    }

    if(!allPropertiesExist) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.subcategoryService.notAllPropertiesExist
        }
      }
    }

    // Creating the new subcategory
    let addedSubcategory = await Subcategory.create({ 
      name,
      category: categoryId,
      urlSlug,
      code,
      properties,
      description
    })
    // Populate category
    addedSubcategory = await addedSubcategory
      .populate('category', '_id name')

    // Populate properties
    addedSubcategory = await addedSubcategory
      .populate('properties.property', '_id name values')

    return {
      success: true,
      outputs: {
        subcategory: addedSubcategory
      }
    }

  } catch(error) {
    console.log('Error while creating the new subcategory: ', error)
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

const getSubcategory = async (subcategoryId: string): Promise<IResponse> => {
  try {
    // Find and return the subcategory
    const subcategory = await Subcategory.findById(subcategoryId)
      .populate('category', '_id name')
      .populate('properties.property', '_id name values')
      .exec()

    if(!subcategory) {
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
        subcategory
      }
    }

  } catch(error) {
    console.log('Error while getting the subcategory: ', error)
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

const getSubcategories = async (
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
    
    // Fetch the subcategories
    const count = await Subcategory.countDocuments(filter)
    let subcategories = await Subcategory.find(filter, {}, queryOptions)
      .populate('category', '_id name')
      .populate('properties.property', '_id name values')
      .exec()

    return {
      success: true,
      outputs: { 
        count,
        subcategories
      }
    }
  } catch(error) {
    console.log('Error while getting the subcategories: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

//---------------------------------------------------------------------------

const getSubcategoriesByCategoryId = async (
  categoryId: string, 
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
    search?: string
  }
): Promise<IResponse> => {
  try {
    // Check if the category exists
    const relatedCategory = await Category.findById(categoryId).exec()
    if(!relatedCategory) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

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

    const filter: { [key: string]: any } = { category: categoryId }
    if(search) {
      filter.name = { $regex: search }
    }
    
    // Fetch the subcategories
    const count = await Subcategory.countDocuments(filter)
    let subcategories = await Subcategory.find(filter, {}, queryOptions)
      .populate('category', '_id name description icon')
      .populate('properties.property', '_id name values')
      .exec()

    return {
      success: true,
      outputs: { 
        count,
        subcategories
      }
    }

  } catch(error) {
    console.log('Error while getting the subcategories by category id: ', error)
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

const editSubcategory = async (
  subcategoryId: string, 
  updates: { 
    name?: string
    urlSlug?: string
    code?: string
    description?: string
    properties?: {
      property: string
      order: number
    }[]
  }
): Promise<IResponse> => {
  try {
    // Make sure the record exists
    const subcategory = await Subcategory.findById(subcategoryId)
      .populate('properties.property', '_id name')
      .populate('products', '_id').exec()

    if(!subcategory) {
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
      const subcategoryWithExistingName = await Subcategory.findOne({ name }).exec()
      if(subcategoryWithExistingName) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.shared.nameMustBeUnique
          }
        }
      }
    }

    if(updates.urlSlug) {
      const { urlSlug } = updates
      const subcategoryWithExistingSlug = await Subcategory.findOne({ urlSlug }).exec()
      if(subcategoryWithExistingSlug) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.shared.slugMustBeUnique
          }
        }
      }
    }

    if(updates.properties) {
      // Check if all the properties exist
      const { properties } = updates
      let allPropertiesExist = true
      for(const item of properties) {
        const propertyExist = await Property.findById(item.property).exec()
        if(!propertyExist) {
          allPropertiesExist = false
          break
        }
      }
      
      if(!allPropertiesExist) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.subcategoryService.notAllPropertiesExist
          }
        }
      }
    }

    // Update the subcategory
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(subcategoryId, updates, { new: true })
      .populate('category', '_id name')
      .populate('properties.property', '_id name values')
      .exec()

    if(updates.properties) {
      const newPropertiesIdList = updates.properties.map((updateProperty) => {
        return updateProperty.property
      })
      
      // Listing deleted properties
      const deletedProperties: {
        _id: string
        name: string
      }[] = []
      subcategory.properties.forEach((property) => {
        // It's for avoiding typescript errors (Logically it's always true)
        if(!('_id' in property.property)) return
        const propertyId = property.property._id.toString()
        if(!newPropertiesIdList.includes(propertyId)) {
          deletedProperties.push(property.property)
        }
      })

      // Deleting deleted properties from products
      for(const product of subcategory.products) {
        for(const deletedProperty of deletedProperties) {
          const update = {
            $pull: {
              properties: {
                name: deletedProperty.name
              }
            }
          }
          await Product.findByIdAndUpdate(product._id, update).exec()
        }
      }
    }

    return {
      success: true,
      outputs: {
        updatedSubcategory
      }
    }

  } catch(error) {
    console.log('Error while updating the subcategory: ', error)
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

const deleteSubcategories = async (idList: string[]): Promise<IResponse> => {
  try {
    for(const id of idList) {
      // Find and delete the subcategory
      const deletedSubcategory = await Subcategory.findByIdAndDelete(id)
        .populate('products', '_id').exec()

      if(deletedSubcategory) {
        // Deleting all products of this subcategory
        const productIds = deletedSubcategory.products.map((product) => product._id.toString())
        await productService.deleteProducts(productIds)
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting the subcategories: ', error)
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
  addSubcategory,
  getSubcategory,
  getSubcategories,
  getSubcategoriesByCategoryId,
  editSubcategory,
  deleteSubcategories
}