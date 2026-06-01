import { defineConfig } from '@prisma/config';
import { DATABASE_URL } from './config/env.js'; 

export default defineConfig({
  // 1. O datasource DEVE ficar na raiz do objeto de configuração
  datasource: {
    url: DATABASE_URL,
  },
  // 2. Opcional: O bloco de migration serve para outras coisas (como o diretório), não para a URL
  migration: {
    // Pode deixar vazio ou omitir essa propriedade por enquanto
  },
});