import * as React from "react";
import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import All from './All'
import Pending from './Pending'
import IsDone from './IsDone'
import { Tasks } from "./ListContext";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import './style.css'

function App() {


  const [userTask, setUserTask] = useState({id:'', title: "",body:'' });
   const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [tasksData, setTasksData] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksData));
  }, [tasksData]);

function showTemporaryAlert(type, message) {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 2000);
  }

  function addTask() {
    const newTask = {
      id: tasksData.length + 1,
      title: userTask.title ,
      body: userTask.body,
      isDone: false,
    };
    setTasksData([...tasksData, newTask]);
      showTemporaryAlert("success", "✅ Added successfully!");
  };

  return (
    <div className="App" style={{position:'relative'}}>

       <Tasks.Provider value={{tasksData, setTasksData}}>

       
      <React.Fragment>
        <CssBaseline />
        <Container>
          <h1>ToDo APP</h1>
          <hr></hr>
          {alert.show && (
        <Stack style={{marginTop:'20px' ,borderRadius:'20px'}} sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert style={{borderRadius:'20px'}} severity={alert.type}>{alert.message}</Alert>
        </Stack>
      )}
          <Stack
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            spacing={2}
            direction="row"
          >
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              
              <Link to="/all" style={{ textDecoration: 'none' }}><Button>All</Button></Link>
              <Link to="/completed" style={{ textDecoration: 'none' }}><Button>Completed</Button></Link>
              <Link to="/pending" style={{ textDecoration: 'none' }}><Button>UnCompleted</Button></Link>
              
             
            </ButtonGroup>
            <div className="addtask">
              
              <TextField style={{margin:'20px'}} onChange={(e)=>{setUserTask({...userTask,title:e.target.value})}} className="text" id="outlined-basic" label="Add Task Title" variant="outlined" />
              <TextField onChange={(e)=>{setUserTask({...userTask,body:e.target.value})}} className="text" id="outlined-basic" label="Add Task Body" variant="outlined" />
              <Button onClick={addTask} variant="contained">Add Task</Button>
              </div>
          </Stack>
       
        </Container>
      </React.Fragment>












       {/* Routes */}
      <Routes>
        <Route path="/all" element={<All />} />
        <Route path="/pending" element={<Pending  />} />
        <Route path="/completed" element={<IsDone />} />
      </Routes>

      
      </Tasks.Provider>
       
    </div>
  );
}

export default App;
