import express from 'express';

const app = express();
const port = 5000;

app.get('/', (request, response) => {
  response.send('rodando');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
