import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { Dispatch } from "react";
import { TaskTableAction } from "../../App";

interface Task {
  id: number;
  description: string;
  date: string;
  completed: boolean;
}

interface TaskTableProps {
  tasks: Task[];
  dispatch: Dispatch<TaskTableAction>;
}

function TaskTable({ tasks, dispatch }: TaskTableProps) {
  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleToggle = (id: number) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const columns = [
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Completa",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (completed ? "Sim" : "Não"),
    },
    {
      title: "Ações",
      key: "actions",
      render: (record: Task) => (
        <span>
          <Button
            onClick={() => handleToggle(record.id)}
            style={{ marginLeft: "100px" }}
          >
            <EditOutlined style={{ marginLeft: "10px" }} />
            {record.completed ? "Desmarcar" : "Marcar"}
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: "10px", background: "red", color: "#FFFF" }}
          >
            <DeleteOutlined /> Excluir
          </Button>
        </span>
      ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} />;
}

export default TaskTable;
