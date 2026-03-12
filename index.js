import express from 'express';
const app = express();

const port = 3000;

app.get('/', (req, res) =>{
    res.json({"mensagem": "Olá mundo!"});
})

app.listen(port, () =>{
    let data = new Date();
    console.log(`Servidor iniciado em ${data}`);
})