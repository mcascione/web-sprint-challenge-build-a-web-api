// add middlewares here related to projects
const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      return res.status(404).json({
        message: "project not found",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateProject(req, res, next) {
  const { name, description, completed } = req.body;

  if (!name || !name.trim() || !description || completed == null) {
    return res.status(400).json({
      message: "name, description and completed are required",
    });
  } else {
    req.name = name.trim();
    req.description = description;
    req.completed = completed;
  }
  next();
}

module.exports = {
  validateProjectId,
  validateProject,
};
