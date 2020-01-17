const express = require('express');
const Action = require('./actionModel.js');
const Projects = require('./projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    Action.get(req.query)
    .then(actions => {
res.status(200).json(actions);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the actions", 
        });
    });
});

router.get('/:id', (req, res)=> {
    Action.get(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the project',
        });
    });
});

router.post('/', (req, res) => {
    Action.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error adding the hub',
        });
    });
});

router.delete('/:id', (req, res) => {
    Action.remove(req.params.id)
    .then(count => {
      if (count > 0) {
          res.status(200).json({ message: 'The project has been removed'});
      }  else {
          res.status(404).json({ message: 'The project could not be found'});
      }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error removing the project'
        });
    });
});

router.put('/:id', (req, res) => {
    Action.update(req.params.id, req.body)
    .then(project => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'The project could not be found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the hub',
        });
    });
});



// endpoint that returns all the projects for a hub
// this is a sub-route or sub-resource

router.get('/:id/projects', (req, res) => {
    Actions.getProjectActions(req.params.id)
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch (error => {
        res.status(500).json({
            message: 'Error getting the projects for the action', 
        });
    });
});

// add an endpoint for adding new project to actions

router.post('/:id/projects', (req, res) => {
    const projectInfo = { ...req.body, project_id: req.params.id };

Projects.add(projectInfo)
.then(project => {
    res.status(210).json(project);
})
.catch(error => {
    console.log(error);
    res.status(500).json({
        message: "Error getting the projects for the action ", 
        });
    });
});

module.exports = router; 