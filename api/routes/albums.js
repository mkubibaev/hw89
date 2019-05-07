const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const checkUser = require('../middlewares/checkUser');

const Album = require('../models/Album');

const router = express.Router();

router.get('/', checkUser, async (req, res) => {
    const criteria = {isPublished: true};

    if (req.user && req.user.role === 'admin') {
        delete criteria.isPublished;
    }

    if (req.query.artist) {
        criteria.artist = req.query.artist;
    }

    try {
        const albums = await Album
            .find(criteria)
            .sort('year')
            .populate('artist', 'name');

        return res.send(albums);
    } catch {
        res.sendStatus(400);
    }

});

router.get('/:id', checkUser, async (req, res) => {
    const criteria = {isPublished: true, _id: req.params.id};

    if (req.user && req.user.role === 'admin') {
        delete criteria.isPublished;
    }

    try {
        const album = await Album.findOne(criteria);

        if (album) {
            return res.send(album);
        } else {
            return res.sendStatus(404);
        }
    } catch {
        return res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const albumData = {
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        user: req.user._id
    };
    
    if (req.file) {
        albumData.image = req.file.filename;
    }

    try {
        const album = new Album(albumData);

        await album.save();
        return res.send({message: 'Album added!', album});
    } catch {
        return res.sendStatus(400);
    }
});

module.exports = router;
