import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const users = [
  {
    username: 'bobesponja',
    avatar:
      'https://yt3.ggpht.com/ytc/AKedOLQ6Ief26j8b1lgSA1OpXSCzJBlnlEEsWtQAfdwB=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    username: 'alguem',
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
    tweet: 'eu amo o hub 2',
  },
];

app.get('/', (request, response) => {
  response.send('rodando.');
});

app.post('/sign-up', (request, response) => {
  const { username, avatar } = request.body;

  if (!username || !avatar) {
    return response.status(400).send('Todos os campos são obrigatórios!');
  }
  users.push(request.body);

  response.status(201).send('OK');
});

app.post('/tweets', (request, response) => {
  const { user } = request.headers;
  const { tweet } = request.body;

  if (!user || !tweet) {
    return response.status(400).send('Todos os campos são obrigatórios!');
  }

  const tweetObject = {
    username: user,
    tweet,
  };
  tweets.push(tweetObject);

  response.status(201).send('OK');
});

app.get('/tweets', (request, response) => {
  const publishedTweets = tweets.map((tweet) => {
    const userAvatar = users.find(
      (user) => user.username === tweet.username
    ).avatar;

    return {
      username: tweet.username,
      tweet: tweet.tweet,
      avatar: userAvatar,
    };
  });

  const last10PublishedTweets = publishedTweets.slice(-10);
  const invertedLast10PublishedTweets = last10PublishedTweets.reverse();

  response.send(invertedLast10PublishedTweets);
});

app.get('/tweets/:username', (request, response) => {
  const { username } = request.params;

  const tweetsFromUser = tweets.filter((tweet) => tweet.username === username);

  const tweetsFromUserWithAvatar = tweetsFromUser.map((tweet) => {
    const userAvatar = users.find(
      (user) => user.username === tweet.username
    ).avatar;

    return {
      username: tweet.username,
      tweet: tweet.tweet,
      avatar: userAvatar,
    };
  });

  response.status(200).send(tweetsFromUserWithAvatar);
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
