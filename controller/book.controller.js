import db from '../database/connection.js';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config();


export const index = async (req, res) => {

    try {
        const todos = await db.query(
            'SELECT id, title, description, img FROM books WHERE deleted = 0 ORDER BY updated_at DESC', 
        );
        
        res.status(200).json(todos);
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
    if(!req?.file){
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