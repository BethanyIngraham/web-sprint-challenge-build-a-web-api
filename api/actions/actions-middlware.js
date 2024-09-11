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


module.exports = {
    checkActionsId,
};