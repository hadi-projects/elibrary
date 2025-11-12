import db from './connection.js';

async function main(){

    // users table migration
    try {
        await db.query(`
        CREATE TABLE users (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL,
            role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
            deleted BOOLEAN DEFAULT FALSE,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`)
            console.log('OK: migrasi tabel users berhasil')

        // book table migration
        await db.query(`
            CREATE TABLE books (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(150) NOT NULL,
            img VARCHAR(50) NOT NULL,
            description VARCHAR(250),
            deleted BOOLEAN DEFAULT FALSE,
            user_id BIGINT NOT NULL,
            catalog ENUM('SAINS', 'BISNIS', 'SEJARAH', 'FIKSI', 'LAINNYA') DEFAULT 'LAINNYA',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT fk_user FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);`)

            console.log('OK: migrasi tabel books berhasil')
        
            // book table migration
        await db.query(`
            CREATE TABLE user_has_favorits (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            user_id BIGINT NOT NULL,
            book_id BIGINT NOT NULL,
            deleted BOOLEAN DEFAULT FALSE,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT fk_user_favourites FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,

            CONSTRAINT fk_book FOREIGN KEY (book_id)
            REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE);
            `)

            console.log('OK: migrasi tabel user has favourites berhasil')

    } catch (error) {
        console.log("ERROR: "+error.toString());
    }finally{
        process.exit();
    }
}

main()