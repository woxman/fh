import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"
const { ObjectId } = mongoose.Schema.Types

export interface IReport extends Document {
  admin: objectId
  ip: string
  event: 'login' | 'logout' | 'createAdmin' | 'createUser' | 'createUsers' | 'deleteAdmin' | 'deleteUser'
  createdAdmin?: objectId
  deletedAdmin?: string
  createdUser?: string
  deletedUser?: string
  createdAt: Date
}

const reportSchema = new Schema<IReport>({
  admin: {
    type: ObjectId,
    ref: 'Admin',
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  createdAdmin: {
    type: ObjectId,
    ref: 'Admin'
  },
  createdUser: {
    type: ObjectId,
    ref: 'User'
  },
  deletedAdmin: {
    type: String
  },
  deletedUser: {
    type: String
  }
}, {
  timestamps: true
})

reportSchema.methods.toJSON = function() {
  const report = this
  const reportObject = report.toObject()

  // Converting timestamps to unix time
  if(reportObject.createAt) {
    reportObject.createdAt = Math.floor(new Date(reportObject.createdAt).getTime() / 1000)
  }

  return reportObject
}


const Report = mongoose.model<IReport>("Report", reportSchema)

export default Report
