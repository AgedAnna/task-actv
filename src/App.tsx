import { useReducer, useState } from "react";
import TaskModal from "./components/Task/Task";
import TaskTable from "./components/TableTask/TableTask";
import { Button, Divider } from "antd";
import "./App.css";

interface TaskProps {
  id: number;
  description: string;
  date: string;
  completed: boolean;
}

interface State {
  tasks: TaskProps[];
}

export interface AddTaskAction {
  type: "ADD_TASK";
  payload: TaskProps;
}

export interface DeleteTaskAction {
  type: "DELETE_TASK";
  payload: number; // Task ID
}

export interface ToggleTaskAction {
  type: "TOGGLE_TASK";
  payload: number; // Task ID
}

export type TaskTableAction =
  | AddTaskAction
  | DeleteTaskAction
  | ToggleTaskAction;

type Action = AddTaskAction | DeleteTaskAction | ToggleTaskAction;

const initialState: State = {
  tasks: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map((task) =>
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

  const addTask = (task: TaskProps) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  return (
    <div style={{ alignItems: "center" }}>
      <Button type="primary" onClick={openModal}>
        Criar Tarefa
      </Button>

      <TaskModal show={showModal} onClose={closeModal} addTask={addTask} />
      <Divider />

      <TaskTable tasks={state.tasks} dispatch={dispatch} />
    </div>
  );
}

export default App;
