const express = require('express');
const auth = require('../middlewares/auth');
const checkUser = require('../middlewares/checkUser');
const permit = require('../middlewares/permit');

const Track = require('../models/Track');

const router = express.Router();

router.get('/', checkUser, async (req, res) => {
    const criteria = {isPublished: true};

    if (req.user && req.user.role === 'admin') {
        delete criteria.isPublished;
    }

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

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Track.deleteOne({_id: req.params.id});
        return res.sendStatus(200);
    } catch {
        return res.status(400);
    }
});

router.post('/:id/toggle_publish', [auth, permit('admin')], async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        
        if(!track) {
            return res.sendStatus(404);
        }

        track.isPublished = !track.isPublished;
        await track.save();

        return res.send(track);
    } catch {
        return res.sendStatus(400);
    }
});

module.exports = router;
