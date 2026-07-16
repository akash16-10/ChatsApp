import jwt from 'jsonwebtoken';
import { ENV } from '../utils/env.js';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: 'Unauthorized access 1' });
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({ message: 'Unauthorized access 2' });
        }
        const user = await User.findById(decoded.userId).select('-password').lean(); 
        // Exclude password from the user object
        if(!user){
            return res.status(401).json({ message: 'Unauthorized access 3' });
        }
        req.user = user; // Attach the user object to the request for further use

        next();

    }catch(error){
        console.error('Error in protectRoute middleware: ', error.message);
        return res.status(401).json({ message: 'Unauthorized access' });
    };
};