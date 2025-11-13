import db from '../database/connection.js';

export const index = async (req, res) => {
    const userId = req.user.id;
    try {
        const favorites = await db.query(
            'SELECT book_id FROM user_has_favorits WHERE deleted = 0 AND user_id = ? ORDER BY updated_at DESC',
            [userId]
        );

        res.status(200).json({ 'status': 'success', data: favorites });
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const create = async (req, res) => {
    const userId = req.user.id;
    const bookId = req.query.bookId

    try {
        await db.query(
            'INSERT INTO user_has_favorits (book_id, user_id) VALUES (?,?);',
            [bookId, userId]
        );

        res.status(200).json({ 'status': 'Berhasil tambah favorite', data: true });
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const destroy = async (req, res) => {
    const bookId = req.params.id;

    try {
            const result = await db.query(
                'UPDATE user_has_favorits SET deleted = 1 WHERE book_id = ?;',
                [bookId]
            );
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Buku tidak ditemukan.' });
            }
    
            res.status(200).json({
                message: 'Berhasil dihapus.',
                data: true
            });
    
        } catch (error) {
            console.error('Error: ', error.toString());
            res.status(500).json({ message: 'Something went wrong.' });
        }
}