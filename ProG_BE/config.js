require('dotenv').config({ path: './config.env' })

export const SECRET_KEY = process.env.SECRET_KEY
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "tranvantri352@gmail.com";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admintesting";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123testing";
export const MAINDB_MONGODB_URL = 'mongodb://localhost:27017'
export const MAINDB_MONGODB_DBNAME = 'OPTIMUSPRIME'
