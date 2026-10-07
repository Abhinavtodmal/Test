import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos')
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async () => {
    if (!task.trim()) return
    try {
      const response = await axios.post('http://localhost:5000/api/todos', { task })
      setTodos([...todos, response.data])
      setTask('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

 const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};


  const updateTodo = async (id) => {
  if (!editText.trim()) return;
  try {
    const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { task: editText });
    setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    setEditingId(null);
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};


  

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      setTodos(todos.map(todo => todo._id === id ? response.data : todo))
    } catch (error) {
      console.error('Error toggling complete:', error)
    }
  }

  return (
    <div className="app">
      <h1>MERN To-Do App</h1>
      <div className="todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => updateTodo(todo._id)}>
                  <FaCheck />
                </button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(todo._id, todo.completed)}>
                  {todo.task}
                </span>
                <div className="actions">
                  <button onClick={() => { setEditingId(todo._id); setEditText(todo.task) }}>
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteTodo(todo._id)}>
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App