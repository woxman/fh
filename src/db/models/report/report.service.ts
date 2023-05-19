import Report from "./report"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"

const getReports = async (
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
  }
): Promise<IResponse> => {
  try {
    const { limit, skip, sortBy, sortOrder } = options
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
    
    // Fetch the reports
    const count = await Report.countDocuments(filter)
    let reports = await Report.find(filter, {}, queryOptions)
      .populate('admin', '_id name')
      .populate('createdAdmin', '_id name')
      .exec()

    return {
      success: true,
      outputs: { 
        count,
        reports
      }
    }
  } catch(error) {
    console.log('Error while getting the reports: ', error)
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
  getReports
}