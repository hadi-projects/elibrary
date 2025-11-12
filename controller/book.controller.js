import db from '../database/connection.js';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config();


export const index = async (req, res) => {
    try {
        const books = await db.query(
            'SELECT id, title, description, img FROM books WHERE deleted = 0 ORDER BY updated_at DESC',
        );

        res.status(200).json({ 'status': 'success', data: books });
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const create = async (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title || String(title).length === 0) {
        return res.status(400).json({ message: 'title wajib diisi.' });
    }
    if (!description || String(description).length === 0) {
        return res.status(400).json({ message: 'description wajib diisi.' });
    }
    if (!req?.file) {
        return res.status(400).json({ message: 'img wajib diberikan.' });
    }

    // get file name
    const uniqueSuffix = Date.now().toString().slice(0, 10) + '-';
    const ext = path.extname(req.file.originalname);
    const imgName = uniqueSuffix + req.file.fieldname + ext

    try {
        await db.query(
            'INSERT INTO books (user_id, title, description, img) VALUES (?, ?, ?, ?)',
            [userId, title, description, imgName]
        );

        res.status(201).json({
            message: 'Berhasil simpan buku baru',
            data: true
        });
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const update = async (req, res) => {
    const bookId = req.params.id;
    const { title, description } = req.body;

    if (!title && !description && req.file === undefined) {
        return res.status(400).json({ message: 'Title, description, atau img harus disediakan untuk update data.' });
    }

    try {

        // get file name
        const uniqueSuffix = Date.now().toString().slice(0, 10) + '-';
        const ext = path.extname(req.file.originalname);
        const imgName = uniqueSuffix + req.file.fieldname + ext


        const updateFields = [];
        const updateValues = [];

        if (title && String(title).length > 0) {
            updateFields.push('title = ?');
            updateValues.push(title);
        }
        if (description && String(description).length > 0) {
            updateFields.push('description = ?');
            updateValues.push(description);
        }
        if (imgName !== undefined) {
            updateFields.push('img = ?');
            updateValues.push(imgName);
        }

        const setClause = updateFields.join(', ');
        const result = await db.query(
            `UPDATE books SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            [...updateValues, bookId]
        );

        if (result.affectedRows === 0) {
            return res.status(500).json({
                message: 'Something went wrong.'
            });
        }

        res.status(200).json({
            message: 'Buku berhasil di update.',
            data: true
        });
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const destroy = async (req, res) => {
    const bookId = req.params.id;

    try {
        const result = await db.query(
            'UPDATE books SET deleted = 1 WHERE id = ?;',
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

