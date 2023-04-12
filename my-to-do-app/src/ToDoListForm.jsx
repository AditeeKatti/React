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
  const [tasks, setTasks] = useState([    'Wake Up',    'Toilet',    'Brush',  ]);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
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
      <ul>
        {Object.keys(tasks).map((key) => (
          <li key={key}>{tasks[key]}</li>
        ))}
      </ul>
    </TodoListContainer>
  );
}

export default TodoList;
