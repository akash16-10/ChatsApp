import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import {ENV} from '../utils/env.js'

export const socketAuthMiddleware = async (socket, next) =>{
    try{
        //extract token from http-only cookies
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if(!token){
            console.log("Socket connection rejected: No token provided");
            return next(new Error("Unauthorized - No Token Provided."));
        }

        //Verify the Token
        const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
        if(!decoded){
            console.log('Socket connection rejected: Invalid Token.')
            return next(new Error("Unauthorized - Invalid Token"));
        }

        //Find the user from db
        const user = await User.findById(decoded.userId).select('-password').lean(); 
        // Exclude password from the user object
        if(!user){
            console.log('Socket connection rejected: User not Found.')
            return next(new Error("User not Found."));
        }

        //attach user to the socket.
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user : ${user.fullName} (${user._id})`);

        next();




    }
    catch(error){
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized - Authentication failed."));
    }
}
