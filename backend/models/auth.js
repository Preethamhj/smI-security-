import pool from './dbconfig'

async function createTables(){
    await  pool.query(`
        CREATE TABLE IF NOT EXISTS users{
        id SERIAL PRIMARY KEY ,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        PASSWORD_hash VARCHAR(255) NOT NULL
         );
        `);
    
}

createTables().then(() => {
    console.log('tables created sucessfully ');
    process.exit();
}).catch(err => console.error(err));

