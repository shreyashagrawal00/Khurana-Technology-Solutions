import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, fullName });
        await user.save();
        // Auto-login: generate token on registration
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            token,
            userId: user._id,
            message: 'User registered successfully'
        });
    }
    catch (error) {
        console.error('Registration Error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, userId: user._id });
    }
    catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Login failed', details: error });
    }
});
export default router;
