import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faSave, faCheck, faRefresh } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  min-height: 400px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f4d4d4;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
const TaskLayout = styled.li`
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: space-between;
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

const SaveButton = styled.button`
  border: none;
  background-color: #4CAF50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CompleteButton = styled.button`
  border: none;
  background-color: #4CAF50;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SaveIcon = styled(FontAwesomeIcon).attrs({
  icon: faSave,
})``;

const PencilIcon = styled(FontAwesomeIcon).attrs({
  icon: faPencilAlt,
})``;

const TrashIcon = styled(FontAwesomeIcon).attrs({
  icon: faTrashAlt,
})``;

const CompletedIcon = styled(FontAwesomeIcon).attrs({
   icon: faCheck,
 })``

 const UndoIcon = styled(FontAwesomeIcon).attrs({
  icon: faRefresh,
})``

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
  const [completedTasks, setCompletedTasks] = useState({});
  const [tasks, setTasks] = useState([
    { id: 'task1', text: 'Wake Up', completed: false },
    { id: 'task2', text: 'Toilet', completed: false },
    { id: 'task3', text: 'Brush', completed: false },
  ]);
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
    const updatedTasks = tasks.map((task) =>
      task.id === taskKey ? { ...task, text: newTaskText } : task
    );
    setTasks(updatedTasks);
    setEditing(null);
    setNewTaskText('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = input.trim();
    if (newTodo.length > 0) {
      const newTask = { id: `task${tasks.length + 1}`, text: newTodo, completed: false };
      const newTasks = [...tasks, newTask];
      setInput('');
      setTasks(newTasks);
    }
  };

  function handleComplete(taskId) {
    setCompletedTasks((prevCompletedTasks) => {
      const newCompletedTasks = { ...prevCompletedTasks };
      if (newCompletedTasks[taskId]) {
        delete newCompletedTasks[taskId];
      } else {
        newCompletedTasks[taskId] = true;
      }
      return newCompletedTasks;
    });
  }

  // Get the current date and time
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const formattedTime = today.toLocaleTimeString();

  return (
    <TodoListContainer>
       <div style={{ textAlign: 'center' }}>
        <h6> Today is {formattedDate} {formattedTime}</h6>
      </div>
      <TodoListText>What's the Plan for Today?</TodoListText>
      <TodoForm>
        <TodoInput
          placeholder="Add a to-do task"
          value={input}
          onChange={handleChange}
          name="text"
          ref={inputRef}
        />
        <TodoButton onClick={handleSubmit}> + </TodoButton>
      </TodoForm>
      <ul>
        {Object.entries(tasks).map(([taskId, task]) => (
          <TaskLayout key={taskId}>
            {editing === taskId ? (
              <>
                <TodoInput value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
                <SaveButton onClick={() => handleSave(taskId)}>
                  <SaveIcon />
                </SaveButton>
              </>
            ) : (
              <>
                <TodoListText style={{ textDecoration: completedTasks[taskId] ? 'line-through' : 'none' }}>
                  {task.text}
                </TodoListText>
                <div>
                  <EditButton onClick={() => handleEdit(taskId)}>
                    <PencilIcon />
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(taskId)}>
                    <TrashIcon />
                  </DeleteButton>
                  <CompleteButton onClick={() => handleComplete(taskId)}>
                    {completedTasks[taskId] ? <UndoIcon/> : <CompletedIcon/>}
                  </CompleteButton>
                </div>
              </>
            )}
          </TaskLayout>
        ))}
      </ul>
    </TodoListContainer>
  );
}

export default TodoList
