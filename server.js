const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const {addTopic, getTopics, addQuiz, getQuizzes, addCard, getCards, deleteTopic, deleteCard, addQuizToTopic, client, deleteQuiz, deleteQuizFromTopic} = require('./db.js');
const bodyParser = require('body-parser')
require('dotenv').config({path: './.env.prod'});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server functioning correctly');
})

app.get('/topics', async (req, res) => {
  const topics = await getTopics();
  res.send(topics);
})

app.get('/quizzes', async (req, res) => {
  const quizzes = await getQuizzes();
  res.send(quizzes);
})

app.get('/cards', async (req, res) => {
  const cards = await getCards();
  res.send(cards);
})

app.post('/topics', async (req, res) => {
  const {topic} = req.body;
  const result = await addTopic(topic);
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else{
    res.send(result);
  }
})

app.post('/topics/addQuiz', async (req, res) => {
  const { topicId, quizId } = req.body;
  const result = await addQuizToTopic({topicId, quizId});
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else{
    res.send(result);
  }
})

app.post('/topics/deleteQuiz', async (req, res) => {
  const { topicId, quizId } = req.body;
  const result = await deleteQuizFromTopic({topicId, quizId});
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else{
    res.send(result);
  }
})

app.delete('/topics/:topicId', async (req, res) => {
  const topicId = req.params.topicId;
  const result = await deleteTopic(topicId);
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else{
    res.send(result);
  }
})


app.post('/quizzes', async (req, res) => {
  const {quiz} = req.body;
  const result = await addQuiz(quiz);
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else{
    res.send(result);
  }
})

app.delete('/quizzes/:quizId', async (req, res) => {
  const quizId = req.params.quizId;
  const result = await deleteQuiz(quizId);
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else{
    res.send(result);
  }
})

app.post('/cards', async (req, res) => {
  const {card} = req.body;
  const result = await addCard(card);
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else if(!result){
    res.status(404).send("No cards were found");
  }else{
    res.send(result);
  }
})

app.delete('/cards/:cardId', async (req, res) => {
  const cardId = req.params.cardId;
  const result = await deleteCard(cardId);
  if(result.message){
    res.status(500).send("Error querying orders database, please try again later");
  }else{
    res.send(result);
  }
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

const shutDown = async () => {
  await client.close();
  console.log("MongoDB client closed");
  process.exit(0);
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);
