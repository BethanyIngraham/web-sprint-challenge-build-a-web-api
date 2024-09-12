// add middlewares here related to actions
const Actions = require('./actions-model');

async function checkActionsId(req, res, next) {
    try {
        const {id} = req.params;
        const action = await Actions.get(id);
        if(action) {
            req.action = action;
            next();
        } else {
            next({
                status: 404,
                message: 'action not found'
            });
        }
    } catch(err) {
        next(err);
    }
}

function checkActionsReqBody(req, res, next) {
    const {project_id, description, notes} = req.body;
    if(
        project_id
        && description !== undefined 
        && typeof description === 'string'
        && description.length
        && description.trim().length
        && description.length <= 128
        && notes !== undefined
        && typeof notes === 'string'
        && notes.length
        && notes.trim().length
    ) {
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        next();
    } else {
        next({
            status: 400,
            message: 'Please provide project_id, description and notes'
        });
    }
}


module.exports = {
    checkActionsId,
    checkActionsReqBody
};