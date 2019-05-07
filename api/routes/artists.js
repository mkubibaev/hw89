const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const Artist = require('../models/Artist');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({isPublished: true});
        return res.send(artists);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findOne({isPublished: true, _id: req.params.id});

        if (artist) {
            return res.send(artist);
        } else {
            return res.sendStatus(404);
        }

    } catch {
        return res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const artistData = {
        name: req.body.name,
        description: req.body.description,
        user: req.user._id
    };
    
    if (req.file) {
        artistData.image = req.file.filename;
    }

    try {
        const artist = new Artist(artistData);

        await artist.save();
        return res.send({message: 'Artist added!', artist});
    } catch {
        return res.sendStatus(400);
    }
});

module.exports = router;
