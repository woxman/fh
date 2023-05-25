const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL || "mongodb://acoexper_amaday:44556970@acoexperts.com:27017/acoexper_amday",
  jwtSecret: process.env.JWT_SECRET || 'somesecret',
  passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY || "somesecret",
  backendUrl: process.env.BACKEND_URL || "http://localhost:3001",
  smsApiKey: process.env.SMS_API_KEY || "4D3673496E55693074466F784F45336262752B4E782B53634E513055485667366758566F645347726235413D"
}

export default config