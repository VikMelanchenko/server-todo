const { v4: uuid } = require('uuid');

const fs = require('fs/promises');
const path = require('path');

const tasksPath = path.join(__dirname, './tasks.json');

const tasksList = async () => {
  const data = await fs.readFile(tasksPath, 'utf-8');
  const tasks = JSON.parse(data);
  return tasks;
};

const getTaskById = async (taskId) => {
  const data = await fs.readFile(tasksPath, 'utf-8');
  const tasks = JSON.parse(data);
  const getTask = tasks.find((task) => task.id === Number(taskId));
  return getTask;
};

const removeTask = async (taskId) => {
  const data = await fs.readFile(tasksPath, 'utf-8');
  const tasks = JSON.parse(data);
  const deletedTask = tasks.filter((task) => task.id !== Number(taskId));

  if (tasks.length === deletedTask.length) {
    return console.error(`Task with ID ${taskId} not found`);
  }

  await fs.writeFile(tasksPath, JSON.stringify(deletedTask));
  console.log(`Contact with ID ${taskId} removed succesfully`);

  return deletedTask;
};

const addTask = async (body) => {
  // const id = uuid().Number();
  const data = await fs.readFile(tasksPath, 'utf-8');
  const tasks = JSON.parse(data);
  const id = tasks.length + 1;
  const newTask = {
    id,
    ...body,
    ...(body.done ? {} : { done: false }), //по умолчанию
  };
  tasks.push(newTask);
  await fs.writeFile(tasksPath, JSON.stringify(tasks), (error) => {
    if (error) {
      return console.log(error);
    }
  });
  return newTask;
};

const updateTask = async (taskId, body) => {
  const data = await fs.readFile(tasksPath, 'utf-8');
  const tasks = JSON.parse(data);
  const task = await getTaskById(taskId);
  const updatedTask = tasks.map((task) => {
    if (task.taskId === Number(taskId)) {
      return { ...task, ...body };
    }
    return task;
  });
  await fs.writeFile(tasksPath, JSON.stringify(updatedTask));
  return { ...task, ...body };
};

module.exports = { tasksList, getTaskById, removeTask, addTask, updateTask };
