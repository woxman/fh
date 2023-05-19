import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

export interface IAdmin extends Document {
  isGodAdmin: boolean
  isSuperAdmin: boolean
  email: string
  phone: string
  password: string
  name: string
  permissions: string[]
  tokens: string[]
  createdAt: Date
  updatedAt: Date
}

const adminSchema = new Schema<IAdmin>({
  isGodAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
    require: true 
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: { 
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: []
  },
  tokens: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
})

adminSchema.methods.toJSON = function() {
  const admin = this
  const adminObject = admin.toObject()

  // Converting timestamps to unix time
  if(adminObject.createAt) {
    adminObject.createdAt = Math.floor(new Date(adminObject.createdAt).getTime() / 1000)
  }
  if(adminObject.updatedAt) {
    adminObject.updatedAt = Math.floor(new Date(adminObject.updatedAt).getTime() / 1000)
  }
  
  // Deleting user password and tokens list
  delete adminObject.password
  delete adminObject.tokens

  return adminObject
}


const Admin = mongoose.model<IAdmin>("Admin", adminSchema)

export default Admin
