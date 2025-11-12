export const roleGuard = (req, res, next) => {
    const role = req.user.role;

    if (role == null || role != 'ADMIN') {
        return res.status(403).json({ message: 'Unauthorized.' });
    }

    next(); 
};