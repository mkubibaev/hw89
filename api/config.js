const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/music_albums',
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
};
