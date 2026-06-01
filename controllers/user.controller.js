import prisma from "../database/prisma.js";


export const getById = async (req, res, next)=>{
    try{
        const {id} = req.params;
        const loggedUser = req.params.userId;

        if(id != loggedUser){
            const error = new Error("Acesso negado!");
            error.statusCode = 403;
            throw error;
        }

        const user = await prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });

        if(!user){
            const error = new Error("Usuario não encontrado!");
            error.statusCode = 404;
            throw error;
        }

        res.statusCode(200).json(user);
    }catch(error){
        next(error);
    }
}

