export const statusCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  ise: 500, //internalServerError
  serviceUnavailable: 503,
  ue: 422, //unprocessableEntity
  userNotFound: 404,
  userNotVerified: 401,
}

export const errorMessages = {
  categoryService: {
    noSuchCategory: 'دسته بندی مورد نظر پیدا نشد'
  },
  subcategoryService: {
    notAllPropertiesExist: 'یک یا چند تا از ویژگی های انتخاب شده وجود ندارند',
    noSuchSubcategory: 'زیرشاخه مورد نظر پیدا نشد'
  },
  factoryService: {
    noSuchFactory: 'کارخانه مورد نظر پیدا نشد'
  },
  productService: {
    invalidProperty: 'یک یا چند ویژگی یا مقادیر آنها در دسته بندی وجود ندارد'
  },
  orderService: {
    invalidProduct: 'یک یا چند محصول از محصولات سفارش وجود ندارد',
    noSuchBill: 'فاکتور مورد نظر وجود ندارد',
    invalidUpdates: 'تغییرات مورد نظر قابل اعمال نیستند',
    invalidStatusUpdate: 'امکان انجام این تغییر وضعیت وجود ندارد',
    notAllProductsExist: 'یک یا چند تا از محصولات انتخاب شده وجود ندارند',
    productsMismatch: 'همه محصولات سفارش با محصولات انتخاب شده مطابقت ندارند',
    invalidShippingDate: 'تاریخ ارسال مورد نظر نامعتبر است'
  },
  adminService: {
    godAdminRoleRequired: "شما ادمین اصلی نیستید",
    emailAlreadyTaken: "با ایمیل مورد نظر حساب ادمین وجود دارد",
    phoneAlreadyTaken: "با شماره تلفن مورد نظر حساب ادمین وجود دارد",
    emailNotFound: "با ایمیل مورد نظر حساب کاربری وجود ندارد",
    godAdminAlreadyExists: "ادمین اصلی از قبل وجود دارد",
    incorrectCredentials: "ایمیل یا رمز عبور اشتباه است"
  },
  userService: {
    phoneAlreadyTaken: "با شماره تلفن مورد نظر حساب کاربری وجود دارد",
    emailAlreadyTaken: "با ایمیل مورد نظر حساب کاربری وجود دارد",
    phoneNotFound: "با شماره تلفن مورد نظر حساب کاربری وجود ندارد",
    incorrectLoginCode: "کد وارد شده اشتباه است",
    loginCodeExpired: "مهلت استفاده از کد به پایان رسیده است",
    noSuchUser: "کاربر مورد نظر وجود ندارد"
  },
  blogService: {
    titleAlreadyTaken: "با عنوان مورد نظر از قبل بلاگی وجود دارد"
  },
  siteInfo: {
    nameIsTaken: 'این نام تکراری است',
    titleIsTaken: 'این عنوان تکراری است',
    phoneIsTaken: 'این تلفن تکراری است',
    questionIsRepetitious: 'این سوال تکراری است',
    imageProblem: 'مشکلی در پردازش تصویر وجود دارد',
    stepExists: 'این مرحله وجود دارد',
    imageMismatch: 'تصویر فرستاده شده نا مناسب است'
  },
  billService: {
    orderNotFound: 'سفارش مورد نظر یافت نشد',
    billNotFound: 'فاکتور مورد نظر یافت نشد'
  },
  shared: {
    ise: "سرور با مشکل مواجه شده",
    permissionsRequired: "شما دسترسی لازم برای این کار را ندارید",
    unauthorized: "هویت شما احراز نشده است",
    notFound: "محتوای مورد نظر یافت نشد",
    nameMustBeUnique: 'نام انتخاب شده از قبل وجود دارد', 
    slugMustBeUnique: 'شناسه لینک انتخاب شده از قبل وجود دارد',
    noChanges: 'هیچ تغییری وجود ندارد'
  }
}

export const websiteName = 'hadad'

export const permissions = ["createAdmin"]

export const allowedImageFormats = ['svg', 'png', 'jpg', 'jpeg']

export const orderStatuses = {
  1: 'در انتظار تایید ادمین',
  2: 'در انتظار انتخاب شیوه پرداخت',
  3: 'آماده پرداخت آنلاین',
  4: 'در انتظار اتمام پرداخت آنلاین',
  5: 'در انتظار آپلود رسید پرداخت',
  6: 'در انتظار تایید پرداخت',
  7: 'در انتظار اصلاح رسید پرداخت',
  8: 'در انتظار انتخاب زمانبندی ارسال',
  9: 'آماده سازی برای ارسال',
  10: 'در حال ارسال',
  11: 'آماده برای تحویل',
  12: 'تحویل شده', 
  13: 'منقضی شده'
}