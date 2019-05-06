const express = require('express');

const auth = require('../middlewares/auth');

const TrackHistory = require('../models/TrackHistory');
const Track = require('../models/Track');
const User = require('../models/User');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    if (req.user) {
        try {
            const trackHistory = await TrackHistory
                .find({user: req.user._id})
                .sort({datetime: -1})
                .populate({
                    path: 'track',
                    select: ['number', 'title'],
                    populate: {
                        path: 'album',
                        select: 'title',
                        populate: {
                            path: 'artist',
                            select: 'name'
                        }
                    },
                });

            return res.send(trackHistory);
        } catch (error) {
            return res.sendStatus(500);
        }
    } else {
        return res.status(401).redirect('/login');
    }
});

router.post('/', async (req, res) => {

    const token = req.get('Authorization');
    if (!token) {
        return res.sendStatus(401);
    }

    const user = await User.findOne({token});
    if (!user) {
        return res.sendStatus(401);
    }

    try {
        const track = await Track.findById(req.body.track);
        if (!track) {
            return res.sendStatus(404);
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track
        });

        await trackHistory.save();
        return res.send(trackHistory);

    } catch {
        res.sendStatus(400);
    }

});

module.exports = router;
