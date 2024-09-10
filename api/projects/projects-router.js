// Write your "projects" router here!
const express = require('express');
const {checkProjectId} = require('./projects-middleware');
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

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    });
});

module.exports = router;
