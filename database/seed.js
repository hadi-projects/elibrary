import db from './connection.js';

async function main() {
    try {
        // admin1234 = $2a$12$FiTrHMgvouipibcbhgnyDOfpdY8F.PVFXOzzmE3I2/Kq5Bu.eWkuW
        // admin
        await db.query(`
            INSERT INTO users (fullname, email, password, role) value
            ('admin', 'admin@mail.com', '$2a$12$bOYxY4vpQu1nnkxb4botSuRMaqEhxbIx6ynF8aVj76ALsLxg7t3O6', 'ADMIN');`)
        console.log('OK: jalankan seed admin user berhasil')

        // hadi1234 = $2a$12$bOYxY4vpQu1nnkxb4botSuRMaqEhxbIx6ynF8aVj76ALsLxg7t3O6
        // user
        await db.query(`
        INSERT INTO users (fullname, email, password) value
        ('hadi', 'hadi@mail.com', '$2a$12$bOYxY4vpQu1nnkxb4botSuRMaqEhxbIx6ynF8aVj76ALsLxg7t3O6');`)
        console.log('OK: jalankan seed user berhasil')

        // books
        await db.query(`
            INSERT INTO books (title, description, img, user_id) value
        ('How to Win Friends and Influence People: Dale Carnegie', 'To "win friends and influence people," focus on genuinely being interested in others, avoiding criticism, and making people feel important', '1762943846-influence.jpg', 1);`)
        console.log('OK: jalankan seed books berhasil')

    } catch (error) {
        console.log("ERROR: " + error.toString());
    } finally {
        process.exit();
    }
}

main()