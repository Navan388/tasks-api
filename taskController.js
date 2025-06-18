let tasks = require('../tasks.json');

exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

exports.getTask = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  task ? res.json(task) : res.status(404).json({ message: "Task not found" });
};

exports.createTask = (req, res) => {
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

exports.deleteTask = (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
};
