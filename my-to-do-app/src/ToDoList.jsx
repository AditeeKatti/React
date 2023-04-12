import React from 'react';
import ToDoListForm from './ToDoListForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const MainContainer = styled.div`
  background-color: #add8e6;
  height: 1000vh;
  padding-top: 10px;
`;

function TodoList() {
  return (
    <MainContainer>
      <div>
          <ToDoListForm />
      </div>
    </MainContainer>
  );
}

export default TodoList;
