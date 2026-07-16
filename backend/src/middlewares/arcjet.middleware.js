import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../utils/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
            else if(decision.reason.isBot()) {
                return res.status(403).json({ message: "Access denied. Bot traffic is not allowed." });
            }
            else{
                return res.status(403).json({ message: "Access denied by security policy." });
            }
        }

        //checked for spoofed bot
        if(decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ 
                error: "Spoofed bot detected.",
                message: "Malicious bot activity detected." 
            });
        }

        next();
    } catch (error) {
        console.error("Error in Arcjet protection middleware:", error);
        next();
    }
};