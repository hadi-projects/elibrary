import db from '../database/connection.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET; 


export const register = async (req, res) => {
    const { email, password } = req.body;

    // simple validation
    if (!email || String(email).length === 0) {
        return res.status(400).json({ message: 'email wajib diisi.' });
    }
    
    else if (!String(email).includes("@") || !String(email).includes(".")) {
        return res.status(400).json({ message: 'email tidak valid.' });
    }
    if (!password || String(password).length === 0) {
        return res.status(400).json({ message: 'password wajib diisi.' });
    }
    else if (String(password).length < 8) {
        return res.status(400).json({ message: 'password minimal 8 karakter.' });
    }
    // end validation


    try {
        // prevent duplicate user
        const existingUser = await db.query('SELECT id FROM users WHERE email = ?', [escape(email)]);
        
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email sudah terdaftar.' });
        }

        // save new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query(
            'INSERT INTO users (email, password) VALUES (?, ?)', 
            [email, hashedPassword]
        );
        
        res.status(201).json({ 
            message: 'Berhasil daftar akun baru',
            data: true
        });

    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    // simple validation
    if (!email || String(email).length === 0) {
        return res.status(400).json({ message: 'email wajib diisi.' });
    }
    else if (!String(email).includes("@") || !String(email).includes(".")) {
        return res.status(400).json({ message: 'email tidak valid.' });
    }
    if (!password || String(password).length < 8) {
        return res.status(400).json({ message: 'password wajib diisi dan minimal 8.' });
    }


    try {
        const users = await db.query('SELECT id, password, role FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Email atau password salah.' });
        }
        
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau password salah.' });
        }
        
        const token = jwt.sign(
            { id: user.id, email: email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Login berhasil', 
            token: token,
            user: { id: user.id, email: email, role: role.user }
        });
    } catch (error) {
        console.error('Error: ', error.toString());
        res.status(500).json({ message: 'Something went wrong.' });
    }
}