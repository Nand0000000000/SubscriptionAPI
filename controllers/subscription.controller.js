import prisma from "../database/prisma.js";


export const createSub = async (req, res, next) => {
    try{
        const {price, status} = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            const error = new Error("Usuário não autenticado.");
            error.statusCode = 401;
            throw error;
        }

        const newSub = await prisma.subscription.create({
            data:{
                price,
                status,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            }
        });
        res.status(201).json({
            success: true,
            data: newSub
        })
    }catch(error){
        next(error);
    }

}

export const getSubByUser = async (req, res, next) => {
    try{
        const userId = req.user?.userId;
        if(req.params.id != userId){
            const error = new Error("Identificação incorreta")
            error.statusCode(401)
            throw error;
        }

        const getSubs = await prisma.subscription.findMany({
            where:{
                userId
            }
        });
        res.status(200).json(getSubs)
    }catch(error){
        next(error);
    }
}