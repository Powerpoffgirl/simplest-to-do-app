import { useState } from "react";
import "./App.css";

function App() {
  //1. Declare the todo object
  const [todo, setTodo] = useState({
    title: "Title",
    description: "Description",
  });
  // 2. Declare the todos array
  const [todos, setTodos] = useState([]);
  // 3. A variable to check whter we need to edit or not?
  const [isEditing, setIsEditing] = useState(false);
  // 4. It stores an index to edit
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);

  // Whenever data of the input contianer changes handleChange functions call
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
    console.log(todo);
  };

  // To save the data of the edited todo in the todos array
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedTodos = [...todos]; //Storing the todos in this variable to create a copy
      updatedTodos[editingTodoIndex] = todo; //Storing the changed todo 
      setTodos(updatedTodos); //Making changes in the todos array
      setIsEditing(false);
      setEditingTodoIndex(null);
    } else {
      setTodos([...todos, todo]);
    }

    setTodo({
      title: "",
      description: "",
    });
    console.log(todos);
  };

  const handleEdit = (index) => {
    const editingTodo = todos[index];
    setTodo({
      title: editingTodo.title,
      description: editingTodo.description,
    });
    setIsEditing(true);
    setEditingTodoIndex(index);
  };

  const handleDelete = (index) => {
    const filteredTodos = todos.filter((_, i) => i !== index);
    setTodos(filteredTodos);
  };

  return (
    <div className="app">
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit}>
        {/* initialised its value */}
        <input
          value={todo.title}
          name="title"
          placeholder="Title"
          type="text"
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          value={todo.description}
          name="description"
          placeholder="Description"
          type="text"
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      {todos.map((item, index) => {
        return (
          <>
            {/* Render the todo object properties */}
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>{" "}
          </>
        );
      })}
    </div>
  );
}

export default App;
