const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

let todos = [
  { id: 1, text: 'Buy groceries' },
  { id: 2, text: 'Walk the dog' },
  { id: 3, text: 'Clean the house' },
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== Number(req.params.id));
  res.json({ message: 'Todo deleted' });
});
