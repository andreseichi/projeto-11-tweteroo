import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());

const users = [
  {
    username: 'bobesponja',
    avatar:
      'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
  },
  {
    username: 'bobesponja',
    avatar:
      'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
  },
];

const tweets = [
  {
    username: 'bobesponja',
    tweet: 'eu amo o hub',
  },
  {
    username: 'bobesponja',
    tweet: 'eu amo o hub',
  },
];

app.get('/', (request, response) => {
  response.send('rodando.');
});

app.post('/sign-up', (request, response) => {
  users.push(request.body);

  response.send('OK');
});

app.post('/tweets', (request, response) => {
  tweets.push(request.body);

  response.send('OK');
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
