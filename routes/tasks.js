const express = require('express');
const router = express.Router();
const Tasks = require('../model/tasks');
const validate = require('./validation');

router.get('/', async (_req, res, next) => {
  try {
    const tasks = await Tasks.tasksList();
    return res.status(200).json({ tasks });
  } catch (e) {
    next(e);
  }
});

router.get('/:taskId', async (req, res, next) => {
  try {
    const task = await Tasks.getTaskById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ data: { task } });
  } catch (e) {
    next(e);
  }
});

router.post('/', validate.addTask, async (req, res, next) => {
  try {
    const task = await Tasks.addTask(req.body);

    if (!task.title || !task.deadline || !task.subtitle || !task.text) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    return res.status(201).json({ task });
  } catch (e) {
    next(e);
  }
});

router.delete('/:taskId', async (req, res, next) => {
  try {
    const task = await Tasks.removeTask(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'task deleted' });
  } catch (e) {
    next(e);
  }
});

router.patch('/:taskId', validate.updateTask, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const result = await Tasks.getTaskById(taskId, next);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    const updatedResult = await Tasks.updateTask(taskId, req.body);
    if (!req.body) {
      return res.status(400).json({ message: 'missing fields' });
    }
    return res.status(200).json(updatedResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
