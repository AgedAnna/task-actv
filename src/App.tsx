import React, { useReducer, useState } from "react";
import TaskModal from "./components/Task/Task";
import TaskTable from "./components/TableTask/TableTask";
import { Button, Divider } from "antd";
import "./App";

const initialState = {
  tasks: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task: any) => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map((task: any) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addTask = (task: any) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  return (
    <div style={{alignItems: "center"}}>
      <Button type="primary" onClick={openModal}>
        Criar Tarefa
      </Button>
      <TaskModal show={showModal} onClose={closeModal} addTask={addTask} />
      <Divider/>

      <TaskTable tasks={state.tasks} dispatch={dispatch} />
    </div>
  );
}

export default App;
