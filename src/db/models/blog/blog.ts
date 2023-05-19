import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

export interface IBlog extends Document {
  title: string
  summary: string
  author: string
  content: string
  show: boolean
  tags: string[]
  category: objectId
  cover: string,
  view: number
  createdAt: Date
  updatedAt: Date
}

const blogSchema = new Schema<IBlog>({
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
  category: {
    type: ObjectId,
    ref: "Category",
    required: true
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

blogSchema.methods.toJSON = function() {
  const blog = this
  const blogObject = blog.toObject()

  // Converting timestamps to unix time
  if(blogObject.createAt) {
    blogObject.createdAt = Math.floor(new Date(blogObject.createdAt).getTime() / 1000)
  }
  if(blogObject.updatedAt) {
    blogObject.updatedAt = Math.floor(new Date(blogObject.updatedAt).getTime() / 1000)
  }

  return blogObject
}


const Blog = mongoose.model<IBlog>("Blog", blogSchema)

export default Blog
