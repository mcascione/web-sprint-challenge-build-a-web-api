// add middlewares here related to actions
const Action = require("./actions-model");
const Project = require("../projects/projects-model");

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

async function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  const project = await Project.get(project_id);
  
  try {
    if (
      !project_id ||
      !project ||
      description.length > 128 ||
      completed == null ||
      !notes ||
      !notes.trim()
    ) {
      return res.status(400).json({
        message:
          "must include description, notes, existing project id and completed",
      });
    } else {
      req.project_id = project_id;
      req.description = description;
      req.notes = notes;
      req.completed = completed;
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateActionID,
  validateAction,
};
