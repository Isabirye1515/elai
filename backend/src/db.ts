import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

console.log(process.env.MYSQL_HOST); // Should log 'localhost'
console.log(process.env.MYSQL_USER); // Should log 'root'
console.log(process.env.MYSQL_PASSWORD); // Should log '123456789'
console.log(process.env.MYSQL_DATABASE); // Should log 'elai'

const db = mysql.createPool(
    {
        host: process.env.MYSQL_HOST!,
        user: process.env.MYSQL_USER!,
        password: process.env.MYSQL_PASSWORD!,
        database: process.env.MYSQL_DATABASE!,
      }
)
export default db;

