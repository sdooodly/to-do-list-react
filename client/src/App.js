import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    const todoText = prompt('Enter a new todo:');
    if (todoText) {
      fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: todoText }),
      })
        .then(response => response.json())
        .then(data => setTodos([...todos, data]));
    }
  };

  const handleDeleteTodo = id => {
    fetch(`/api/todos/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Todo deleted') {
          setTodos(todos.filter(todo => todo.id !== id));
        }
      });
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <button onClick={handleAddTodo}>Add ToDo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
