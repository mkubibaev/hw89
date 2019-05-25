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
        {username: 'calopdumru_1558613014@tfbnw.net', displayName: 'William Alcgbjedceifa Shepardson', facebookId: '100037205435961', password: 'qaz2wsx', role: 'user', token: 'zxcvb'},
        {username: 'nifbxffjnz_1558613008@tfbnw.net', displayName: 'Margaret Alcgajcjhbbba Fergiesen',facebookId: '100037103082221', password: 'qaz2wsx', role: 'admin', token: 'qwerty'},
    );

    const artists = await Artist.create(
        {name: 'Eminem', image: 'artist_eminem.png', isPublished: true, user: users[0]._id},
        {name: 'Rihanna', image: 'artist_rihanna.png', isPublished: true, user: users[1]._id},
        {name: 'Katy Perry', image: 'artist_katy_perry.png', isPublished: true, user: users[0]._id},
    );

    const albums = await Album.create(
        {title: 'Encore', artist: artists[0]._id, year: 2004, image: 'album_encore.png', isPublished: true, user: users[0]._id},
        {title: 'Recovery', artist: artists[0]._id, year: 2010, image: 'album_recovery.png', isPublished: true, user: users[0]._id},
        {title: 'Diamonds', artist: artists[1]._id, year: 2014, image: 'album_diamonds.png', isPublished: true, user: users[0]._id},
        {title: 'Loud', artist: artists[1]._id, year: 2008, image: 'album_loud.png', isPublished: true, user: users[1]._id},
        {title: 'Prism', artist: artists[2]._id, year: 2016, image: 'album_prism.png', isPublished: true, user: users[1]._id}
    );

    await Track.create(
        {title: 'Never enough', album: albums[0]._id, duration: '2:39', number: 2, isPublished: true, user: users[0]._id},
        {title: 'Rain man', album: albums[0]._id, duration: '5:10', number: 1, isPublished: true, user: users[0]._id},
        {title: 'On fire', album: albums[0]._id, duration: '3:07', number: 3, isPublished: true, user: users[1]._id},
        {title: 'Not afraid', album: albums[1]._id, duration: '4:08', number: 7, isPublished: true, user: users[0]._id},
        {title: 'Umbrella', album: albums[2]._id, duration: '4:37', number: 5, isPublished: true, user: users[1]._id},
        {title: 'Skin', album: albums[3]._id, duration: '4:12', number: 6, isPublished: true, user: users[1]._id},
        {title: 'Birthday', album: albums[4]._id, duration: '3:21', number: 4, isPublished: true, user: users[1]._id},
    );

    await connection.close();
};

run().catch(error => {
    console.error('Something went wrong');
});
