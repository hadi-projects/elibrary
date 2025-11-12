import db from './connection.js';

async function main(){

    // users table migration
    try {
        await db.query(`
        CREATE TABLE users (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            fullname VARCHAR(100) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL,
            role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
            deleted BOOLEAN DEFAULT FALSE,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`)
            console.log('OK: migrasi tabel users berhasil')

        // todo table migration
        await db.query(`
            CREATE TABLE book (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL,
            img VARCHAR(50) NOT NULL,
            description VARCHAR(250),
            deleted BOOLEAN DEFAULT FALSE,
            user_id BIGINT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT fk_user FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);`)

            console.log('OK: migrasi tabel books berhasil')

    } catch (error) {
        console.log("ERROR: "+error.toString());
    }finally{
        process.exit();
    }
}

main()