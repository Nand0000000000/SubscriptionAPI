import prisma from "../database/prisma.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data:{
                name, 
                email,
                password: hashedPassword
            }
        });
        res.status(200).json({
            message: "Usuario criado com sucesso!",
            user:{
                id: newUser.id,
                name: newUser.name,
                createdAt: newUser.createdAt
            }
        })
    }catch(error){
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {email}
        });
        
        if(!user){
            const error = new Error("Senha ou email invalidos");
            error.statusCode = 401;
            throw error;
        }

        const isPassword = bcrypt.compare(password, user.password);

        if(!isPassword){
            const error = new Error("Senha ou email invalidos");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {userId: user.id},
            JWT_SECRET,
            {expiresIn: "1d"} 
        );

        res.status(200).json({
            message: "Login efetuado com sucesso!",
            token: token, 
            user: { id: user.id, name: user.name, email: user.email }
        });
    }catch(error){
        next(error);
    }
}
