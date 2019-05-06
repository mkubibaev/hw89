const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: 'Album is required!'
    },
    duration: {
        type: String,
        required: 'Track duration is required!'
    },
    number: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'User is required!'
    }
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;
