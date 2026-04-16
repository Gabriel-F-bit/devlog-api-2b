//npm init - y  //inicia um projeto node
//npm install express  //instala a dependencia do Express
//configura type: module no package.json
//npm nodemon --save-dev
//configura o nodemon no package.json
    //scripts
    //"start": "node index.js",
    //"dev": "nodemon index.js"
//criar o arquivo index.js
//iniciar o servidor express
//npm run dev  //executa o projeto

import projectRoutes from './routes/projectsRoutes.js'
import express from 'express';
const app = express(); //cria instacia do express
app.use(express.json()); //lida com o formato json

const port = 3000;

//Monta o router no prefixo
app.use('/api/v1/projects', projectRoutes);

app.get('/health', (req, res) =>{
    res.json({status: 'OK'});
});

app.listen(port, () => {
    let data = new Date();
    console.log(`Servidor iniciado em ${data}`);
});