const express = require('express');

const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
    const criteria = {};

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
        const album = await Album.findById(req.params.id);

        if (album) {
            return res.send(album);
        } else {
            return res.sendStatus(404);
        }
    } catch {
        return res.sendStatus(500);
    }
});

module.exports = router;
