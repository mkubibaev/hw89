const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: 'Artist is required!',
    },
    year: String,
    image: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'User is required!'
    }
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
