const mongoose = require('mongoose');
const config = require('./config');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;
    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const users = await User.create(
        {username: 'lina', password: '123', role: 'user', token: 'zxcvb'},
        {username: 'putin', password: '123', role: 'user', token: 'qwerty'},
        {username: 'admin', password: '123', role: 'admin', token: 'asdfg'}
    );

    const artists = await Artist.create(
        {name: 'Eminem', image: 'artist_eminem.png', user: users[0]._id},
        {name: 'Rihanna', image: 'artist_rihanna.png', user: users[1]._id},
        {name: 'Katy Perry', image: 'artist_katy_perry.png', user: users[0]._id},
    );

    const albums = await Album.create(
        {title: 'Encore', artist: artists[0]._id, year: 2004, image: 'album_encore.png', user: users[0]._id},
        {title: 'Recovery', artist: artists[0]._id, year: 2010, image: 'album_recovery.png', user: users[0]._id},
        {title: 'Diamonds', artist: artists[1]._id, year: 2014, image: 'album_diamonds.png', user: users[0]._id},
        {title: 'Loud', artist: artists[1]._id, year: 2008, image: 'album_loud.png', user: users[1]._id},
        {title: 'Prism', artist: artists[2]._id, year: 2016, image: 'album_prism.png', user: users[1]._id}
    );

    await Track.create(
        {title: 'Never enough', album: albums[0]._id, duration: '2:39', number: 2, user: users[0]._id},
        {title: 'Rain man', album: albums[0]._id, duration: '5:10', number: 1, user: users[0]._id},
        {title: 'On fire', album: albums[0]._id, duration: '3:07', number: 3, user: users[1]._id},
        {title: 'Not afraid', album: albums[1]._id, duration: '4:08', number: 7, user: users[0]._id},
        {title: 'Umbrella', album: albums[2]._id, duration: '4:37', number: 5, user: users[1]._id},
        {title: 'Skin', album: albums[3]._id, duration: '4:12', number: 6, user: users[1]._id},
        {title: 'Birthday', album: albums[4]._id, duration: '3:21', number: 4, user: users[1]._id},
    );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong');
});
