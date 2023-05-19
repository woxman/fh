"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const siteInfoSchema = new mongoose_1.Schema({
    websiteName: {
        type: String,
        required: true
    },
    mainPage: {
        logo: {
            type: String
        },
        newsAndBanner: {
            banner: {
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
                icon: {
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
                image: {
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
            images: [{
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
                image: {
                    type: String
                },
            },
            image: {
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
                image: {
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
            image: {
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
});
const SiteInfo = mongoose_1.default.model("SiteInfo", siteInfoSchema);
exports.default = SiteInfo;
