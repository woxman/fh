import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface ISiteInfo extends Document {
  websiteName: string
  mainPage: {
    logo: string
    newsAndBanner: {
      banner: string
      news: string
    }
    socialNetworks: {
      _id: objectId
      name: string
      link: string
      show: boolean
      icon: string
      createdAt: number
    }[]
    orderSteps: {
      _id: objectId
      step: number
      title: string
      description: string
      image: string
      createdAt: number
    }[]
    specialProducts: {
      subcategory: objectId
      factory: objectId
      products: objectId[]
    }[]
    footer: {
      content: string
      email: string
      phone: string
      address: string
      workHours: string
      images: string[]
    }
  }
  aboutUs: {
    pageContent: {
      title: string
      content: string
      quotation: {
        content: string
        name: string
        role: string
        image: string
      }
      image: string
    }
    projects: {
      _id: objectId
      title: string
      description: string
      image: string
      createdAt: number
    }[]
  }
  contactUs: {
    pageContent: {
      email: string
      phone: string
      address: string
      workHours: string
      image: string
    }
    questionAndAnswers: {
      _id: objectId
      question: string
      answer: string
      createdAt: number
    }[]
    experts: {
      _id: objectId
      name: string
      phone: string
      category?: objectId | {
        _id: objectId
        name: string
      }
      socialNetworks: {
        name: string
        link: string
        icon: string
      }[]
      image: string
      createdAt: number
    }[]
  }
}

const siteInfoSchema = new Schema<ISiteInfo>({
  websiteName: {
    type: String,
    required: true
  },
  mainPage: {
    logo: { //This is going to be a url of a stored image
      type: String
    },
    newsAndBanner: {
      banner: { //This is going to be a url of a stored image
        type: String
      },
      news: {
        type: String
      },
    },
    socialNetworks: [{
      name: {
        type: String
      },
      link: {
        type: String
      },
      show: {
        type: Boolean
      },
      icon: { //This is going to be a url of a stored image
        type: String
      },
      createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000)
      }
    }],
    orderSteps: [{
      step: {
        type: Number
      },
      title: {
        type: String
      },
      description: {
        type: String
      },
      image: { //This is going to be a url of a stored image
        type: String
      },
      createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000)
      }
    }],
    specialProducts: [{
      _id: false,
      subcategory: {
        type: ObjectId,
        ref: 'Subcategory'
      },
      factory: {
        type: ObjectId,
        ref: 'Factory'
      },
      products: [{
        type: ObjectId,
        ref: 'Product'
      }]
    }],
    footer: {
      content: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String
      },
      address: {
        type: String
      },
      workHours: {
        type: String
      },
      images: [{ //This is going to be a url of a stored image
        type: String
      }]
    }
  },
  aboutUs: {
    pageContent: {
      title: {
        type: String
      },
      content: {
        type: String
      },
      quotation: {
        content: {
          type: String
        },
        name: {
          type: String
        },
        role: {
          type: String
        },
        image: { //This is going to be a url of a stored image
          type: String
        },
      },
      image: { //This is going to be a url of a stored image
        type: String
      }
    },
    projects: [{
      title: {
        type: String
      },
      description: {
        type: String
      },
      image: { //This is going to be a url of a stored image
        type: String
      },
      createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000)
      }
    }]
  },
  contactUs: {
    pageContent: {
      email: {
        type: String
      },
      phone: {
        type: String
      },
      address: {
        type: String
      },
      workHours: {
        type: String
      },
      image: { //This is going to be a url of a stored image
        type: String
      }
    },
    questionAndAnswers: [{
      question: {
        type: String
      },
      answer: {
        type: String
      },
      createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000)
      }
    }],
    experts: [{
      name: {
        type: String
      },
      phone: {
        type: String
      },
      category: {
        type: ObjectId,
        ref: 'Category'
      },
      socialNetworks: [{
        _id: false,
        name: {
          type: String
        },
        link: {
          type: String
        },
        icon: {
          type: String
        },
      }],
      image: {
        type: String
      },
      createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000)
      }
    }]
  }
})

const SiteInfo = mongoose.model<ISiteInfo>("SiteInfo", siteInfoSchema)

export default SiteInfo
