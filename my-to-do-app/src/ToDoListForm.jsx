import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import './App.css';

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  height: 400px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f4d4d4;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
const Task = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TaskButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.type === 'edit' ? '#3498db' : '#e74c3c'};
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const TaskText = styled.span`
  flex-grow: 1;
`;

const TodoListText = styled.h4`
  padding: 5px;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const TodoForm = styled.form`
  display: flex;
  align-items: center;
`;

const TodoInput = styled.input`
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
`;
const EditButton = styled.button`
  border: none;
  background-color: #3498db;
  color: #fff;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;


const TodoButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: #2ecc71;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
`;

function TodoList() {
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [tasks, setTasks] = useState([    'Wake Up',    'Toilet',    'Brush',  ]);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = (taskKey) => {
    const { [taskKey]: _, ...newTasks } = tasks;
    setTasks(newTasks);
  };

  const handleEdit = (taskKey) => {
    setEditing(taskKey);
    setNewTaskText(tasks[taskKey]);
  };
  
  const handleSave = (taskKey) => {
    const newTasks = { ...tasks, [taskKey]: newTaskText };
    setTasks(newTasks);
    setEditing(null);
    setNewTaskText('');
  };  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = input.trim();
    if (newTodo.length > 0) {
      const newTasks = {
        ...tasks,
        [`task${Object.keys(tasks).length + 1}`]: newTodo,
      };
      setInput('');
      setTasks(newTasks);
    }
  };

  return (
    <TodoListContainer>
      <TodoListText>What's the Plan for Today?</TodoListText>
      <TodoForm>
        <TodoInput
          placeholder="Add a todo"
          value={input}
          onChange={handleChange}
          name="text"
          ref={inputRef}
        />
        <TodoButton onClick={handleSubmit}> + </TodoButton>
      </TodoForm>
      {Object.keys(tasks).map((key) => (
  <li key={key}>
    {editing === key ? (
      <>
        <TodoInput
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <EditButton onClick={() => handleSave(key)}>Save</EditButton>
      </>
    ) : (
      <>
        <span>{tasks[key]}</span>
        <div>
          <EditButton onClick={() => handleEdit(key)}>Edit</EditButton>
          <DeleteButton onClick={() => handleDelete(key)}>Delete</DeleteButton>
        </div>
      </>
    )}
  </li>
))}

    </TodoListContainer>
  );
}

export default TodoList;
