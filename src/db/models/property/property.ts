import mongoose, { Document, Schema } from "mongoose"

interface IProperty extends Document {
  name: string
  values: string[]
  createdAt: Date
  updatedAt: Date
}

const propertySchema = new Schema<IProperty>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  values: {
    type: [String],
    required: true
  }
}, {
  timestamps: true
})

propertySchema.methods.toJSON = function() {
  const property = this
  const propertyObject = property.toObject()
  
  // Converting timestamps to unix time
  if(propertyObject.createAt) {
    propertyObject.createdAt = Math.floor(new Date(propertyObject.createdAt).getTime() / 1000)
  }
  if(propertyObject.updatedAt) {
    propertyObject.updatedAt = Math.floor(new Date(propertyObject.updatedAt).getTime() / 1000)
  }

  return propertyObject
}

const Property = mongoose.model<IProperty>('Property', propertySchema)

export default Property