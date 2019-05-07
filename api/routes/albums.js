const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
    const criteria = {isPublished: true};

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

router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findOne({_id: req.params.id, isPublished: true});

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
