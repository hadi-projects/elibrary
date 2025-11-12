import db from './connection.js';

async function main() {
    try {
        // admin1234 = $2a$12$FiTrHMgvouipibcbhgnyDOfpdY8F.PVFXOzzmE3I2/Kq5Bu.eWkuW
        // admin
        await db.query(`
            INSERT INTO users (email, password, role) value
            ('admin@mail.com', '$2a$12$FiTrHMgvouipibcbhgnyDOfpdY8F.PVFXOzzmE3I2/Kq5Bu.eWkuW', 'ADMIN');`)
        console.log('OK: jalankan seed admin user berhasil')

        // hadi1234 = $2a$12$bOYxY4vpQu1nnkxb4botSuRMaqEhxbIx6ynF8aVj76ALsLxg7t3O6
        // user
        await db.query(`
        INSERT INTO users (email, password) value
        ('hadi@mail.com', '$2a$12$bOYxY4vpQu1nnkxb4botSuRMaqEhxbIx6ynF8aVj76ALsLxg7t3O6');`)
        console.log('OK: jalankan seed user berhasil')

        // books
        await db.query(`
            INSERT INTO books (title, description, img, user_id) value
        ('Atomic Habits', 'Banyak orang yang bilang kalau perubahan besar sering kali diawali dengan langkah-langkah kecil. Namun, tak jarang merasa bingung langkah kecil apa saja yang harus dilakukan dan diambil.', '9786020633-Atomic_Habit.jpg', 1),
        ('Aku Bukannya Menyerah, Hanya Sedang Lelah', 'Dalam hidup, terkadang kita merasa lelah, tak berdaya, dan merasa bersalah atas keadaan. Kita juga sering merasa belum melakukan yang terbaik, padahal sudah berusaha sebaik mungkin.', '1762943846-Aku-Bukannya-Menyerah.jpg', 1),
        ('Duduk Dulu Jangan Lupa Jadi Manusia', 'Ada kalanya ketika kita harus mengejar banyak hal, kau tiba-tiba menyadari ada begitu banyak yang harus dibetulkan, yang harus diselesaikan.', '1762943846-duduk-dulu.jpg', 1),
        ('The Psychology of Money', 'Sedang mengalami kecemasan berlebih seputar kondisi keuangan? Salah satu rekomendasi buku self improvement best seller ini cocok untuk dibaca oleh siapa saja yang ingin mengelola uang dengan lebih baik.', '1762943846-psycologhy-of-money.jpg', 1),
        ('Mindset Self Theories', 'Buku berjudul “Mindset Self Theories:” sudah terbukti telah mengubah cara orang melihat dunia dan kesuksesan hidup di berbagai belahan dunia.', '1762943846-self-theoris.jpeg', 1),
        ('The Things You Can See Only When You Slow Down', '“The Things You Can See Only When You Slow Down” merupakan buku pengembangan diri karya seorang guru meditasi Buddhis terkenal yang lahir di Korea dan dididik di Amerika Serikat, yakni Haenim Sunim.', '1762943846-the-things-you-can-see.jpg', 1),
        ('IKIGAI', 'Buku ini merupakan hasil penelitian terhadap rahasia hidup orang Jepang dengan rata-rata usia di atas 100 tahun (centenarian) yang tinggal di Zona Biru.', '1762943846-ikigai.jpeg', 1),
        ('How to Win Friends and Influence People: Dale Carnegie', 'To "win friends and influence people," focus on genuinely being interested in others, avoiding criticism, and making people feel important', '1762943846-influence.jpg', 1),
        ('The 7 Habits Of Highly Effective People', 'Buku self improvement berjudul “The 7 Habits of Highly Effective People” karya Stephen R. Covey yang pertama kali diterbitkan pada tahun 1989.', '1762943846-7-effective.png', 1),
        ('Sebuah Seni untuk Bersikap Bodo Amat', 'Isinya sangat relevan dan kontekstual dengan fenomena-fenomena sosial zaman ini. Mengingat, saat ini banyak orang mudah terseret arus konsumerisme, gemar mencari validasi semu, dan sering merasa kesepian di tengah hingar bingar dunia.', '1762943846-sebuah-seni-bersikap.jpg', 1)
        ;`)
        console.log('OK: jalankan seed books berhasil')

    } catch (error) {
        console.log("ERROR: " + error.toString());
    } finally {
        process.exit();
    }
}

main()