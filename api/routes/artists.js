const express = require('express');

const auth = require('../middlewares/auth');
const permit = require('../middlewares/permit');
const upload = require('../middlewares/upload');
const checkUser = require('../middlewares/checkUser');

const Artist = require('../models/Artist');

const router = express.Router();

router.get('/', checkUser, async (req, res) => {
    const criteria = {isPublished: true};

    if (req.user && req.user.role === 'admin') {
        delete criteria.isPublished
    }

    try {
        const artists = await Artist.find(criteria);
        return res.send(artists);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', checkUser, async (req, res) => {
    const criteria = {isPublished: true, _id: req.params.id};

    if (req.user && req.user.role === 'admin') {
        delete criteria.isPublished
    }

    try {
        const artist = await Artist.findOne(criteria);

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

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Artist.deleteOne({_id: req.params.id});
        return res.sendStatus(200);
    } catch {
        return res.status(400);
    }
});

router.post('/:id/toggle_publish', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        
        if(!artist) {
            return res.sendStatus(404);
        }

        artist.isPublished = !artist.isPublished;
        await artist.save();

        return res.send(artist);
    } catch {
        return res.sendStatus(400);
    }
});

module.exports = router;
