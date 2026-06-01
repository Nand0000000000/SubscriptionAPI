import prisma from "../database/prisma.js";


export const createSub = async (req, res, next) => {
    try{
        const {price, status} = req.body;
        const {userId} = req.user.userId;

        const newSub = prisma.subscription.create({
            data:{
                price,
                status,
                user: userId
            }
        });
        res.status(200).json({
            success: true,
            data: newSub
        })
    }catch(error){
        next(error);
    }

}