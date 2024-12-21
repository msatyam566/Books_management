require("dotenv").config();

module.exports = {

  app: {
    serverURL: process.env.BASE_SERVER_URL,
    apiURL: process.env.BASE_API_URL,
    clientURL: "http://localhost:3000" || process.env.BASE_CLIENT_URL,
  },



  sendEmail: {
    host: process.env.HOST_EMAIL,
    user: process.env.USER,
    pass: process.env.PASSWORD
  },

  superAdmin: {
    adminEmail: process.env.SUPER_ADMIN_EMAIL
  },
  


  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  },




}