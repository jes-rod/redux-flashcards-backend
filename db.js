const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config({path: './.env.prod'});

const uri = process.env.DB_URL;
const client =  new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectClient = async () => {
  await client.connect()
  console.log("Client connected")
}

connectClient();


const addTopic = async (topic) => {
  try {
    const database = client.db("flashcards");
    const topics = database.collection("topics");
    await topics.insertOne({id: topic.id, name: topic.name, icon: topic.icon, quizIds: topic.quizIds });
    return "Topic added successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const addQuizToTopic = async ({topicId, quizId}) => {
  try {
    const database = client.db("flashcards");
    const topics = database.collection("topics");
    await topics.updateOne({id: topicId}, {$push: {quizIds: quizId}});
    return "Quizz added to Topic successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const deleteTopic = async (topicId) => {
  try {
    const database = client.db("flashcards");
    const topics = database.collection("topics");
    await topics.deleteOne({id: topicId});
    return "Topic deleted successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const getTopics = async () => {
  try {
    const database = client.db("flashcards");
    const topics = database.collection("topics");
    const result = await topics.find().toArray();
    return result
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const addQuiz = async (quiz) => {
  try {

    const database = client.db("flashcards");
    const quizzes = database.collection("quizzes");
    await quizzes.insertOne({id: quiz.id, name: quiz.name, topicId: quiz.topicId, cardIds: quiz.cardIds });
    return "Quiz added successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const deleteQuiz = async (quizId) => {
  try {
    const database = client.db("flashcards");
    const quizzes = database.collection("quizzes");
     await quizzes.deleteOne({id: quizId});
    return "Quiz deleted successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const deleteQuizFromTopic = async ({topicId, quizId}) => {
  try {
    const database = client.db("flashcards");
    const topics = database.collection("topics");
    await topics.updateOne({id: topicId}, {$pull: {quizIds: quizId}});
    return "Quiz deleted successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}


const getQuizzes = async (uer) => {
  try {
    const database = client.db("flashcards");
    const quizzes = database.collection("quizzes");
    const result = await quizzes.find().toArray();
    return result
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}


const addCard = async (card) => {
  try {

    const database = client.db("flashcards");
    const cards = database.collection("cards");
    await cards.insertOne({id: card.id, front: card.front, back: card.back });
    return "Card added successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const deleteCard = async (cardId) => {
  try {
    const database = client.db("flashcards");
    const cards = database.collection("cards");
    await cards.deleteOne({id: cardId});
    return "Card deleted successfully"
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}

const getCards = async (email) => {
  try {
    const database = client.db("flashcards");
    const cards = database.collection("cards");
    const result = await cards.find().toArray();
    return result
  }
  catch(error){
    console.log(error)
    return {error: error.message}
  }    
}


module.exports = {addTopic, getTopics, addQuiz, getQuizzes, addCard, getCards, addQuizToTopic, deleteTopic , deleteQuiz, deleteCard, deleteQuizFromTopic, client}