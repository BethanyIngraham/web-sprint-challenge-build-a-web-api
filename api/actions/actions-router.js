// Write your "actions" router here!
const express = require('express');
const {checkActionsId, checkActionsReqBody} = require('./actions-middlware');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

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

router.post('/', checkActionsReqBody, async (req, res, next) => {
    try {
       const actionObject = {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed ? true : false
       };
       const {project_id} = req.body;
       const project = await Projects.get(project_id);
       if(!project) {
        res.status(422).json({
            message: 'Project id is not valid'
        });
       } else {
         const action = await Actions.insert(actionObject);
         res.status(201).json(action);
       }
    } catch(err) {
        next(err);
    }
});

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