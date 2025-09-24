import mysql from 'mysql2/promise'

export const pool=mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'itson',
    database:'tienda',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
});