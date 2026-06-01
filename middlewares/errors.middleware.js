import { Prisma } from "@prisma/client";

export const errorMiddlware = (err, req, res, next) => {
    console.error("Erro capturado pelo middleware")
    console.error(err)

    if(err instanceof Prisma.PrismaClientKnownRequestError){
        switch(err.code){
            case "P2002":
               return res.status(409).json({
                    error: "Conflito de dados",
                    message: `O campo [${err.meta?.target}] já está em uso`
                });
        }
    }
}