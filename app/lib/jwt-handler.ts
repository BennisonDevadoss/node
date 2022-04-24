import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env

function generateTokenforTemp(user) {
    return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '30min' });
}

export { generateTokenforTemp }

