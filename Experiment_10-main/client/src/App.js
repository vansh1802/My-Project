import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const getTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    await axios.post("http://localhost:5000/todos", { text, completed: false });
    setText("");
    getTodos();
  };

  const updateTodo = async (id, completed) => {
    await axios.put(`http://localhost:5000/todos/${id}`, { completed: !completed });
    getTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    getTodos();
  };

  return (
    <div style={{ padding: "30px", width: "300px", margin: "auto" }}>
      <h2>Todo App</h2>
      
      <input 
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>
      
      {todos.map(todo => (
        <div key={todo._id} style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span 
            onClick={() => updateTodo(todo._id, todo.completed)}
            style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer" }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo._id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default App;
