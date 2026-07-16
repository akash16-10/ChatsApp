import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId, res) => {
    if(!ENV.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }
    
    const token = jwt.sign({userId}, ENV.JWT_SECRET_KEY, 
        { expiresIn: '7d' }
    );

    console.log(token)
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7*24*60 * 60 * 1000 ,// 7 days
        sameSite: 'strict',
        secure: ENV.NODE_ENV === 'development' ? false : true,
    });
    return token;
}