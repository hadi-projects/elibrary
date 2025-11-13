import db from '../database/connection.js';
import dotenv from 'dotenv';
import path from 'path'
import jwt from 'jsonwebtoken';

dotenv.config();


export const index = async (req, res) => {
    try {
        const limit = req.query.limit
        const JWT_SECRET = process.env.JWT_SECRET;

        const booksResult = await db.query(
            `SELECT id, title, description, img, catalog
     FROM books
     WHERE deleted = 0
     ORDER BY updated_at DESC
     ${limit ? 'LIMIT ?' : ''}`,
            limit ? [limit] : []
        );

        let books = Array.isArray(booksResult) && booksResult.length === 2 && Array.isArray(booksResult[0])
            ? booksResult[0]
            : booksResult;

        books = Array.isArray(books) ? books : [];

        let favSet = new Set();

        const authHeader = req.headers['authorization'];
        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1];
                if (token) {
                    const user = await jwt.verify(token, JWT_SECRET);
                    if (user?.id && books.length > 0) {
                        const bookIds = books.map(b => b.id).filter(id => id != null);
    
                        if (bookIds.length > 0) {
                            const placeholders = bookIds.map(() => '?').join(',');
                            const favsResult = await db.query(
                                `SELECT book_id FROM user_has_favorits
                 WHERE deleted = 0 AND user_id = ? AND book_id IN (${placeholders})`,
                                [user.id, ...bookIds]
                            );
    
                            const favRows = Array.isArray(favsResult) && favsResult.length === 2 && Array.isArray(favsResult[0])
                                ? favsResult[0]
                                : favsResult;
    
                            favSet = new Set((favRows || []).map(r => Number(r.book_id)));
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        books.forEach(b => {
            b.isFavorite = favSet.has(Number(b.id)); 
            b.img = `${process.env.HOST}/img/${b.img}`;
        });

        res.status(200).json({ 'status': 'success', data: books });
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const create = async (req, res) => {
    const userId = req.user.id;
    const { title, description, catalog } = req.body;

    if (!title || String(title).length === 0) {
        return res.status(400).json({ message: 'title wajib diisi.' });
    }
    if (!description || String(description).length === 0) {
        return res.status(400).json({ message: 'description wajib diisi.' });
    }
    if (!catalog || String(catalog).length === 0) {
        return res.status(400).json({ message: 'catalog wajib diisi.' });
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
            'INSERT INTO books (user_id, title, description, img, catalog) VALUES (?, ?, ?, ?, ?)',
            [userId, title, description, imgName, catalog]
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
    const { title, description, catalog } = req.body;

    if (!title && !description && req.file === undefined) {
        return res.status(400).json({ message: 'Title, description, catalog atau img harus disediakan untuk update data.' });
    }

    try {
        let imgName;
        if (req.file) {
            // get file name
            const uniqueSuffix = Date.now().toString().slice(0, 10) + '-';
            const ext = path.extname(req.file.originalname);
            imgName = uniqueSuffix + req.file.fieldname + ext
        }


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
        if (catalog && String(catalog).length > 0) {
            updateFields.push('catalog = ?');
            updateValues.push(catalog);
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

