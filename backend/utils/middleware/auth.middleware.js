import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateTokenMiddleware = async(req, res, next) => {
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")) {
        res.status(400).send({
            error: "Malformed header or token is missing"
        });
    }

    const token = header.split(" ")[1];
    try {
        // checks token integrity or throws error
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(err) {
        res.status(401).send({
            error: "Invalid or expireed token. Error: " + err.message
        })
    }
}