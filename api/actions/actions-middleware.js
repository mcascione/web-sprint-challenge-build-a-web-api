// add middlewares here related to actions
const Action = require("./actions-model");

async function validateActionID(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      return res.status(404).json({
        message: "no such action",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateActionID,
};
