const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();
const url = process.env.MONGOLAB_URI;

MongoClient.connect(url, (error, client) => {
    MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB')
            const db = client.db('star-wars-quotes')
            const quotesCollection = db.collection('quotes')
            const castsCollection = db.collection('casts')
            app.set('view engine', 'ejs');
            app.use(bodyParser.urlencoded({extended: true}));
            app.get('/', (request, response) => {
                quotesCollection.find().toArray()
                castsCollection.find().toArray()
                    .then(results => {
                        console.log(results)
                        response.render('index.ejs',  { quotes: results })
                        response.render('casts.ejs',  { casts: results })
                    })
                    .catch(error => console.error(error))
            })
            app.post('/quotes', (request, response) => {
                console.log(request)
                quotesCollection.insertOne(request.body)
                    .then(result => {
                        console.log(result)
                        response.redirect('/')
                    })
                    .catch(error => console.error(error))
            })
            app.post('/casts', (request, response) => {
                console.log(request)
                castsCollection.insertOne(request.body)
                    .then(result => {
                        console.log(result)
                        response.redirect('/')
                    })
                    .catch(error => console.error(error))
            })
            app.listen(8000, ()  => {
                console.log('listening on port 8000')
            })
            })
        .catch(error => console.error(error))
})