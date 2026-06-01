import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const authorize = async (req, res, next) => {
    try{
        let token;

        if(req.headers.autorization && req.headers.autorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            const error = new Error("Acesso negado. Token não fornecido.");
            error.statusCode = 401;
            throw error;
        }        
        const decoded = jsonwebtoken.verify(token, JWT_SECRET);

        req.user = {userId: decoded.userId};

        next();
    }catch(error){
        if (error.name === "JsonWebTokenError") {
            error.message = "Token inválido.";
            error.statusCode = 401;
        }
        if (error.name === "TokenExpiredError") {
            error.message = "Token expirado. Faça login novamente.";
            error.statusCode = 401;
        }
        next(error);
    }
};