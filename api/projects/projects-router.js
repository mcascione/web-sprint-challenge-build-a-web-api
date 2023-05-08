// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const router = express.Router();
const { validateProjectId, validateProject } = require("./projects-middleware");
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateProject, async (req, res, next) => {
  try {
    const newProject = await Project.insert({
      name: req.name,
      description: req.description,
      completed: req.completed,
    });
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateProject,
  async (req, res, next) => {
    try {
      const project = await Project.update(req.params.id, req.body);
      res.status(200).json(project);
    } catch (err) {
      next(err);
    }
  }
);

// router.delete('/:id', (req, res) => {

// })

// router.get('/:id/actions', (req, res) => {

// })

router.use((error, req, res, next) => {  //eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "something bad happened in the projects router",
  });
});

module.exports = router;
