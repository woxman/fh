import Category from './category'
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import imageService from '../image/image.service'
import SiteInfo from '../siteInfo/siteInfo'
import { websiteName } from '../../../utils/constants'
import subcategoryService from '../subcategory/subcategory.service'

const addCategory = async (
  newCategory: { 
    name: string
    urlSlug: string
    description: string
    icon: {
      format: string
      data: Buffer 
    }
  }
): Promise<IResponse> => {
  try {
    const { name, urlSlug, description, icon } = newCategory

    // Checking for availability
    const categoryWithExistingName = await Category.findOne({ name }).exec()
    if(categoryWithExistingName) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.nameMustBeUnique
        }
      }
    }

    const categoryWithExistingSlug = await Category.findOne({ urlSlug }).exec()
    if(categoryWithExistingSlug) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.slugMustBeUnique
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

    // Creating the new category
    const addedCategory = await Category.create({
      name,
      urlSlug,
      description,
      icon: iconUrl
    })

    return {
      success: true,
      outputs: {
        category: addedCategory
      }
    }

  } catch(error) {
    console.log('Error while creating the new category: ', error)
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

const getCategory = async (categoryId: string): Promise<IResponse> => {
  try {
    // Find and return the category
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

    return {
      success: true,
      outputs: {
        category
      }
    }

  } catch(error) {
    console.log('Error while getting the category: ', error)
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

const getCategories = async (
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

    // Fetch the categories
    const count = await Category.countDocuments(filter)
    let categories = await Category.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        categories
      }
    }

  } catch(error) {
    console.log('Error while getting the categories: ', error)
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

const editCategory = async (
  categoryId: string,
  updates: { 
    name?: string
    urlSlug?: string
    description?: string
    icon?: {
      format: string
      data: Buffer
    } 
  }
): Promise<IResponse> => {
  try {

    // Make sure the record exists
    const category = await Category.findById(categoryId).exec()
    if(!category) {
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
      const categoryWithExistingName = await Category.findOne({ name }).exec()
      if(categoryWithExistingName) {
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
      const categoryWithExistingSlug = await Category.findOne({ urlSlug }).exec()
      if(categoryWithExistingSlug) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.shared.slugMustBeUnique
          }
        }
      }
    }

    // Store the new image in database
    if(updates.icon) {
      const result = await imageService.updateImage(category.icon, updates.icon.format, updates.icon.data)
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

    // Update the category
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, updates, { new: true }).exec()

    return {
      success: true,
      outputs: {
        category: updatedCategory
      }
    }

  } catch(error) {
    console.log('Error while updating the category: ', error)
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

const deleteCategories = async (idList: string): Promise<IResponse> => {
  try {
    for(const id of idList) {
      // Find and delete the category
      const deletedCategory = await Category.findByIdAndDelete(id)
        .populate('subcategories', '_id').exec()

      if(deletedCategory) {
        // Deleting the icon of the deleted category
        await imageService.deleteImage(deletedCategory.icon)

        // Deleting all subcategories of deleted category
        const subcategoryIds = deletedCategory.subcategories.map((subcategory) => subcategory._id.toString())
        await subcategoryService.deleteSubcategories(subcategoryIds)

        // set category field of experts that are related to this category
        const siteInfo = await SiteInfo.findOne({ websiteName }).exec()
        if(!siteInfo) {
          return {
            success: true
          }
        }
        const experts = siteInfo.contactUs.experts
  
        experts.forEach((_, index) => {
          if(experts[index].category?.toString() == id) {
            delete experts[index].category
          }
        })
        const update = {
          'contactUs.experts': experts
        }
        await SiteInfo.findOneAndUpdate({ websiteName }, update).exec()
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting the categories: ', error)
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
  addCategory,
  getCategory,
  getCategories,
  editCategory,
  deleteCategories
}