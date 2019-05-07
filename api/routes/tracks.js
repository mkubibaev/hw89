const express = require('express');
const auth = require('../middlewares/auth');

const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
    const criteria = {isPublished: true};

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

router.post('/', auth, async (req, res) => {
    try {
        const trackData = {
            title: req.body.title,
            album: req.body.album,
            duration: req.body.duration,
            user: req.user._id,
            number: await Track.countDocuments() + 1
        };

        const track = new Track(trackData);

        await track.save();
        return res.send({message: 'Track added!', track});
    } catch {
        return res.sendStatus(400);
    }
});

module.exports = router;
