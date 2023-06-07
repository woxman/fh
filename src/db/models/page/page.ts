import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

export interface IPage extends Document {
  title: string
  summary: string
  author: string
  content: string
  show: boolean
  tags: string[]
  categorys: string[]
  cover: string,
  view: number
  createdAt: Date
  updatedAt: Date
}

const pageSchema = new Schema<IPage>({
  title: {
    type: String,
    unique: true,
    required: true
  },
  summary: { 
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  categorys: {
    type: [String],
    default: []
  },
  cover: { //This is going to be a url of a stored image
    type: String
  },
  view: {
    type: Number,
    default: 0,
    required: true
  }
}, {
  timestamps: true
})

pageSchema.methods.toJSON = function() {
  const page = this
  const pageObject = page.toObject()

  // Converting timestamps to unix time
  if(pageObject.createAt) {
    pageObject.createdAt = Math.floor(new Date(pageObject.createdAt).getTime() / 1000)
  }
  if(pageObject.updatedAt) {
    pageObject.updatedAt = Math.floor(new Date(pageObject.updatedAt).getTime() / 1000)
  }

  return pageObject
}


const Page = mongoose.model<IPage>("Page", pageSchema)

export default Page
