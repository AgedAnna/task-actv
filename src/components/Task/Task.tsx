import { DatePicker, Form, Input, Modal } from "antd";
import { Moment } from "moment";
import { useState } from "react";

export interface Task {
  id: number;
  description: string;
}

interface TaskModalProps {
  show: boolean;
  onClose: () => void;
  addTask: (task: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ show, onClose, addTask }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState<Moment | null>(null);

  const handleSubmit = () => {
    const newTask = {
      id: Math.random(),
      description: taskDescription,
      date: taskDate ? taskDate.format("YYYY-MM-DD") : null,
      completed: false,
    };
    addTask(newTask);
    setTaskDescription("");
    setTaskDate(null);
    onClose();
  };

  return (
    <div style={{ display: show ? "block" : "none" }}>
      <Modal
        title="Criar Tarefa"
        visible={show}
        onOk={handleSubmit}
        onCancel={onClose}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="InDescrição">
            <Input onChange={(e) => setTaskDescription(e.target.value)} />
          </Form.Item>

          <Form.Item label="Data">
            <DatePicker
              value={taskDate}
              onChange={(date) => setTaskDate(date)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskModal;
