// Write your "actions" router here!
const express = require('express');
// bring in middleware
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch(err) {
        next(err);
    }
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        cutsomMessage: 'Server error'
    });
});

module.exports = router;