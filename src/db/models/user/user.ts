import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

export interface IUser extends Document {
  phone: string
  loginCode: {
    code: string
    expiresAt: number
  }
  name: string
  email: string
  addresses: string[]
  favoriteProducts: objectId[],
  tokens: string[]
  code: string
  postCode: string
  shSabtMelli: string
  shEghtasadi: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  phone: {
    type: String,
    unique: true,
    required: true
  },
  loginCode: {
    code: {
      type: String,
      default: ""
    },
    expiresAt: {
      type: Number,
      default: 0
    }
  },
  name: { 
    type: String
  },
  email: { 
    type: String
  },
  favoriteProducts: [{
    _id: false,
    type: ObjectId,
    ref: 'Product'
  }],
  addresses: [{
    type: String
  }],
  code: { 
    type: String
  },
  postCode: { 
    type: String,
    default: ""
  },
  shSabtMelli: { 
    type: String,
    default: ""
  },
  shEghtasadi: { 
    type: String,
    default: ""
  },
  tokens: [{
    type: String,
    default: []
  }]
}, {
  timestamps: true
})

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  // Converting timestamps to unix time
  if(userObject.createAt) {
    userObject.createdAt = Math.floor(new Date(userObject.createdAt).getTime() / 1000)
  }
  if(userObject.updatedAt) {
    userObject.updatedAt = Math.floor(new Date(userObject.updatedAt).getTime() / 1000)
  }

  // Deleting user password and tokens list
  delete userObject.loginCode
  delete userObject.tokens

  return userObject
}

const User = mongoose.model<IUser>("User", userSchema)

export default User
