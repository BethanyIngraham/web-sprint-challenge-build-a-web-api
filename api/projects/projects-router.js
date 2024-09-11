// Write your "projects" router here!
const express = require('express');
const {checkProjectId, checkReqBody} = require('./projects-middleware');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.project);
});

router.post('/', checkReqBody, async (req, res, next) => {
    try {
        const newProjectObj = {
            name: req.body.name, 
            description: req.body.description,
            completed: req.body.completed === true ? true : false
        };
        const newProject = await Projects.insert(newProjectObj);
        res.status(201).json(newProject);
    } catch(err) {
        next(err);
    }
});

router.put('/:id', checkProjectId, checkReqBody, async (req, res, next) => {
    try {
       const {id} = req.params;
       const {name, description, completed} = req.body;
       if(completed === undefined) {
        next({
            status: 400,
            message: 'Please provide name, description and the completed status'
        });
       } else {
        const updatedProject = await Projects.update(id, {
            name: name, 
            description: description, 
            completed: completed
           });
        res.status(200).json(updatedProject);
       }  
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', checkProjectId, async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletedProject = await Projects.remove(id); // eslint-disable-line
        res.status(200).json({
            message: `Project with id ${id} was deleted`
        });
    } catch(err) {
        next(err);
    }
});

router.get('/:id/actions', checkProjectId, async (req, res, next) => {
    try {
        const {id} = req.params;
        const projectActions = await Projects.getProjectActions(id);
        res.status(200).json(projectActions);
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
