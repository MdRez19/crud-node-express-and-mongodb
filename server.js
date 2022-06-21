const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();
const url = process.env.MONGOLAB_URI;

const PORT = process.env.PORT || 8000;

MongoClient.connect(url, (error, client) => {
    MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB')
            const db = client.db('star-wars-quotes')
            const quotesCollection = db.collection('quotes')
            // const castsCollection = db.collection('casts')

            app.set('view engine', 'ejs');
            app.use(bodyParser.urlencoded({extended: true}));
            app.use(express.static('public'))
            app.use(bodyParser.json())
            app.get('/', (request, response) => {
                quotesCollection.find().toArray()
                // castsCollection.find().toArray()
                    .then(results => {
                        console.log(results)
                        response.render('index.ejs',  { quotes: results })
                        // response.render('casts.ejs',  { casts: results })
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
            // app.post('/casts', (request, response) => {
            //     console.log(request)
            //     castsCollection.insertOne(request.body)
            //         .then(result => {
            //             // console.log(result)
            //             response.redirect('/')
            //         })
            //         .catch(error => console.error(error))
            // })

            app.put('/quotes', (request, response) => {
                quotesCollection.findOneAndUpdate(
                    { name: 'Yoda' },
                    {
                        $set: {
                            name: request.body.name,
                            quote: request.body.quote
                        }
                    },
                    {
                        upsert: true
                    }
                )
                    .then(result => {
                        // console.log(result)
                        response.json('Success')
                    })
                    .catch(error => console.error(error))
                // console.log(request.body)
            })

            app.delete('/quotes', (request, response) => {
                // Handle delete event here
                quotesCollection.deleteOne(
                    { name: request.body.name }
                )
                    .then(result => {
                        if (result.deletedCount === 0) {
                            return response.json('No quote to delete')
                        }
                        response.json(`Deleted Darth Vader's quote`)
                    })
                    .catch(error => console.error(error))
            })

            app.listen(PORT, () => {
                console.log(`The server is running on port ${PORT}! Better Go Catch it!`)
            })
            })
        .catch(error => console.error(error))
})