import mysql from "mysql2"; 
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DBNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

console.log(process.env.DB_HOST);
console.log(process.env.DB_DBNAME);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);


db.getConnection((err, conn) => {
    if(err){
        console.log(err);
    }else{
        console.log("Connected Successfully!");
    }
})

export default db;