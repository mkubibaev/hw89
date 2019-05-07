const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    description: String,
    isPublished: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'User is required!'
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
