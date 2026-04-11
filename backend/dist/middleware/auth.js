import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err.name || 'Error', err.message);
            console.error('Raw Header Received:', authHeader);
            console.error('Extracted Token:', token);
            return res.sendStatus(403);
        }
        req.userId = decoded.userId;
        next();
    });
};
