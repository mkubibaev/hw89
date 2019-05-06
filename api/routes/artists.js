const express = require('express');

const Artist = require('../models/Artist');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (artist) {
            return res.send(artist);
        } else {
            return res.sendStatus(404);
        }

    } catch {
        return res.sendStatus(500);
    }
});

module.exports = router;
