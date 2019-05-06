const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const artists = require('./routes/artists');
const albums = require('./routes/albums');
const tracks = require('./routes/tracks');
// const users = require('./app/users');
// const track_history = require('./app/track_history');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

mongoose.connect(config.dbUrl, config.mongoOptions)
    .then(() => {
        app.use('/artists', artists);
        app.use('/albums', albums);
        app.use('/tracks', tracks);
        // app.use('/users', users);
        // app.use('/track_history', track_history);

        app.listen(port, () => {
            console.log(`Server started on ${port} port`);
        });

    });
