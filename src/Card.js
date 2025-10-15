import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";
import Delete from "@mui/icons-material/DeleteOutlineOutlined";
import Update from "@mui/icons-material/Check";
import Edit from "@mui/icons-material/Mode";
import "./style.css";
import { useContext, useState } from "react";
import { Tasks } from "./ListContext";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function Card({list}) {
   const { tasksData, setTasksData } = useContext(Tasks);
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });
    const [editingId, setEditingId] = useState(null);
    const [editedTask, setEditedTask] = useState({ title: '', body: '' });

  function DeleteTask(id) {
     
    const newList = tasksData.filter((task) => task.id !== id);
    setTasksData(newList);
     showTemporaryAlert("success", "✅ Task deleted successfully!");
  }
  function ToggleTask(id) {
    const newList = tasksData.map((task) => {
      if (task.id === id) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    setTasksData(newList);
      showTemporaryAlert("info", "📝 Task status updated!");
  }

  function EditTask(id) {
    const taskToEdit = tasksData.find(task => task.id === id);
    setEditingId(id);
    setEditedTask({ title: taskToEdit.title, body: taskToEdit.body });
  }

  function SaveEdit() {
    const updatedTasks = tasksData.map(task =>
      task.id === editingId ? { ...task, title: editedTask.title, body: editedTask.body } : task
    );
    setTasksData(updatedTasks);
    setEditingId(null);
    setEditedTask({ title: '', body: '' });
    showTemporaryAlert("success", "✅ Task updated successfully!");
  }

  function CancelEdit() {
    setEditingId(null);
    setEditedTask({ title: '', body: '' });
  }
   function showTemporaryAlert(type, message) {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 2000);
  }
  

  return (
    <>
     {alert.show && (
        <Stack style={{marginTop:'20px' ,borderRadius:'20px'}} sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert style={{borderRadius:'20px'}} severity={alert.type}>{alert.message}</Alert>
        </Stack>
      )}
      {list.map((task) => (
        <div className={`todoDiv ${task.isDone ? 'completed' : ''}`} key={task.id}>
          {editingId === task.id ? (
            <div style={{ padding: "10px" }}>
              <TextField
                fullWidth
                label="Edit Title"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                fullWidth
                label="Edit Body"
                value={editedTask.body}
                onChange={(e) => setEditedTask({ ...editedTask, body: e.target.value })}
                multiline
                rows={3}
                style={{ marginBottom: '10px' }}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" onClick={SaveEdit}>
                  Save
                </Button>
                <Button variant="outlined" onClick={CancelEdit}>
                  Cancel
                </Button>
              </Stack>
            </div>
          ) : (
            <div style={{ padding: "10px" }}>
              <h2 style={{ textAlign: "start" }}>{task.title}</h2>
              <p style={{ textAlign: "start", fontSize: "20px" }}>{task.body}</p>
            </div>
          )}
          <div>
            <Stack direction="row" spacing={2}>
              <div className="listbtn">
                <IconButton onClick={() => DeleteTask(task.id)} aria-label="delete">
                  <Delete   sx={{ color: red[500] }} />
                </IconButton>
              </div>

              <div className="listbtn">
                <IconButton onClick={() => EditTask(task.id)} aria-label="edit">
                  <Edit sx={{ color: blue[500] }} />
                </IconButton>
              </div>
              <div className="listbtn">
                <IconButton onClick={() => ToggleTask(task.id)} aria-label="toggle">
                  <Update sx={{ color: green[500] }} />
                </IconButton>
              </div>
            </Stack>
          </div>
        </div>
      ))}

      
    </>
  );
}
