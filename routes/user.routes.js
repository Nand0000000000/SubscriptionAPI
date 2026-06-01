import { Router } from "express";
import prisma from "../database/prisma.js"
import {getById} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try{
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        res.status(200).json(users)
    }catch(error){
        console.error(error);
        res.status(500).json({error})
    }
})

userRouter.get("/:id", getById)

userRouter.post("/", async (req, res) => {
    try {
        // 1. Pegamos name, email e password do body (removido o id!)
        const { name, email, password } = req.body;

        // 2. Passamos os dados obrigatórios para o banco
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password // A senha precisa entrar aqui!
            }
        });

        // 3. Retorna o status 201 com o usuário criado
        res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: newUser
        });
    } catch (error) {
        console.error(error); // Adicione isso para você ver o erro real no terminal se algo falhar
        res.status(400).json({ error: "Erro ao criar usuário ou e-mail já cadastrado." });
    }
});

userRouter.put("/:id", async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const {id} = req.params;
        
        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                name,
                email,
                password 
            }
        });
        res.status(200).json({
            message: "Os dados foram atualizados com sucesso!",
            user: updatedUser
        });
    }catch(error){
        next(error);
    }
})

userRouter.delete("/:id", async (req, res) => {
    try{
        const {id} = req.params;

        const deletedUser = await prisma.user.delete({
            where:{
                id 
            }
        });
        res.status(200).json({
            message: "Ususario deletado com sucesso",
            user:  deletedUser
        });
    }catch(error){
        console.log(error)
        res.status(400)
    }
    
})

export default userRouter;