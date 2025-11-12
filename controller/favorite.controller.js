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