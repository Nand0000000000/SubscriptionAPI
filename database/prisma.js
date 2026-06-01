// database/prisma.js
import pkg from "pg"; // Importa o pacote completo como padrão
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client"; 
import { DATABASE_URL } from "../config/env.js"; // Garanta que a rota para o seu env está correta aqui

const { Pool } = pkg; // Extrai a classe Pool de dentro do pacote

// 1. Cria a conexão usando o Pool correto
const pool = new Pool({ connectionString: DATABASE_URL });

// 2. Envelopa a conexão no adapter do Prisma
const adapter = new PrismaPg(pool);

// 3. Inicializa o cliente do Prisma passando o adapter
const prisma = new PrismaClient({ adapter });

export default prisma;