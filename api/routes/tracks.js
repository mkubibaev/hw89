const express = require('express');

const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    const criteria = {};

    if (req.query.album) {
        criteria.album = req.query.album;
    }

    try {
        const tracks = await Track
            .find(criteria)
            .sort('number')
            .populate({
                path: 'album',
                select: 'title',
                populate: {path: 'artist', select: 'name'}
            });

        return res.send(tracks);
    } catch {
        return res.sendStatus(500);
    }
});

module.exports = router;
