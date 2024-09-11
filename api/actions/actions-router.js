// Write your "actions" router here!
const express = require('express');
const {checkActionsId} = require('./actions-middlware');
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

router.get('/:id', checkActionsId, (req, res) => {
    res.status(200).json(req.action);
});

// router.post('/', (req, res) => {

// });

// router.put('/:id', checkActionsId, (req, res) => {

// });

// router.delete('/:id', checkActionsId, (req, res) => {

// });

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message || 'Server error'
    });
});

module.exports = router;