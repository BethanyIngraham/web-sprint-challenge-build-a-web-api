// add middlewares here related to projects
const Projects = require('./projects-model');

async function checkProjectId(req, res, next) {
    try {
        const {id} = req.params;
        const project = await Projects.get(id);
        if(project) {
            req.project = project;
            next();
        } else {
            next({
                status: 404, 
                message: `Project ${id} not found`
            });
        }
    } catch(err) {
       next(err);
    }
}

function checkReqBody(req, res, next) {
    const {name, description} = req.body;
    if(
        name !== undefined 
        && typeof name === 'string' 
        && name.length
        && name.trim().length
        && description !== undefined
        && typeof description === 'string'
        && description.length
        && description.trim().length
    ) {
        req.name = name;
        req.description = description;
        next();
    } else {
        next({
            status: 400, 
            message: 'Please provide name and description'
        });
    }
}

module.exports = {
    checkProjectId,
    checkReqBody
};