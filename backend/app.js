const express = require ('express');
const app = express();

const bodyParser = require ('body-parser');
app.use (bodyParser.json());
const Livro = require ('./models/livro');
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://fatec-ipi:bossini@cluster0.6a1ur.mongodb.net/fatec-ipi-db?retryWrites=true&w=majority')
.then(() => console.log ("Conexão OK"))
.catch((e) => console.log ("Conexão falhou: " + e));

const livros = [
  {
    id: '2',
    titulo: 'Cem Sonetos de Amor',
    autor: 'Pablo Neruda',
    paginas: '12341234'
  },
  {
    id: '2',
    titulo: 'O Auto da Compadecida',
    autor: 'Ariano Suassuna',
    paginas: '12341234'
  }
]

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/livros', (req, res, next) => {

  const livro = new Livro ({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas
  });
  livro.save()
  .then((document) => {
    console.log(`Inserção ok: ${document}`);
    res.status(201).json({
      mensagem: 'Livro Inserido'
    });
  })
  .catch((error) => {
    console.log (`Inserção NOK: ${error}`);
    res.status(404).json({
      mensagem: 'O livro não foi inserido, tente novamente'
    })
  })
});



app.get ('/api/livros', (req, res, next) =>{
  Livro.find()
  .then(documents => {
    res.status(200).json({
      mensagem: 'Operação Concluída',
      livros: documents
    })
  })
  .catch ((error) => {
    console.log ('Nada foi encontrado: ' + error)
    res.status(404).json({
      mensagem: 'A busca falhou',
      livros: []
    })
  })
})



module.exports = app;
