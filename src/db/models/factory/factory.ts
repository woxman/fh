import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface IFactory extends Document {
  name: string
  city: string
  description: string
  icon: string
  products: { // This is a virtual field
    _id: objectId
  }[]
  createAt: Date
  updatedAt: Date
}

const factorySchema = new Schema<IFactory>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  // This is going to be the url of a stored image
  icon: {
    type: String,
    required: true,
  }
}, { 
  timestamps: true
})

factorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'factory'
})

factorySchema.methods.toJSON = function() {
  const factory = this
  const factoryObject = factory.toObject()
  
  // Converting timestamps to unix time
  if(factoryObject.createAt) {
    factoryObject.createdAt = Math.floor(new Date(factoryObject.createdAt).getTime() / 1000)
  }
  if(factoryObject.updatedAt) {
    factoryObject.updatedAt = Math.floor(new Date(factoryObject.updatedAt).getTime() / 1000)
  }

  return factoryObject
}

const Factory = mongoose.model<IFactory>('Factory', factorySchema)

export default Factory