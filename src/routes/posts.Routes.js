// Importa o framework Express para criar a API
import express from "express";

// Importa o middleware Multer para o upload de imagens
import multer from "multer";

// Importa funções controladoras de arquivos separados (provavelmente em ../controllers/postsController.js)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
   origin: "http://localhost:8000", 
  optionsSucccessStatus: 200
}

// Configura o armazenamento de arquivos usando multer.diskStorage
const storage = multer.diskStorage({
  // Define o diretório de destino para uploads (pasta uploads/)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo salvo (nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Opção alternativa para o diretório de destino, mas comentada (funciona em Linux/Mac)
// const upload = multer({dest: "./uploads"})

// Função que configura as rotas da API e é exportada como padrão
const routes = (app) => {
  // Habilita o parsing de requisições JSON pelo Express
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para buscar todos os posts (utiliza a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (utiliza a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (utiliza middleware upload.single("imagem") e a função uploadImagem) 
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes como padrão
export default routes;
