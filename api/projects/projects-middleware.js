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

module.exports = {
    checkProjectId,
};