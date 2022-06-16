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
            const quotesCollection = db.collection('casts')
            app.set('view engine', 'ejs');
            app.use(bodyParser.urlencoded({extended: true}));
            app.get('/', (request, response) => {
                quotesCollection.find().toArray()
                    .then(results => {
                        console.log(results)
                        response.render('cast.ejs',  { casts: results
                        })
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
            })
        })