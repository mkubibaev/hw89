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
    facebook: {
        appId: '290039321939355',
        appSecret: '4f4e5eaf4fd224e22238a6ac1973109d'
    }
};
