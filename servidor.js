import express from "express";
import routes from "./src/routes/posts.Routes.js";

const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e xibe uma mensagem no cocnsole
app.listen(3000, () => {
    console.log("Servidor escutando...");
});