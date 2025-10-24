import * as React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import All from './All'
import Pending from './Pending'
import IsDone from './IsDone'
import { Tasks } from "./ListContext";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import ViewListIcon from '@mui/icons-material/ViewList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import './style.css'

function App() {
  const location = useLocation();

  const [userTask, setUserTask] = useState({id:'', title: "",body:'' });
   const [alert, setAlert] = useState({ show: false, type: "", message: "" });
   const [isLoading, setIsLoading] = useState(false);
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
    if (!userTask.title.trim() || !userTask.body.trim()) {
      showTemporaryAlert("error", "❌ Task title and body cannot be empty!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const newTask = {
        id: tasksData.length + 1,
        title: userTask.title.trim(),
        body: userTask.body.trim(),
        isDone: false,
      };
      setTasksData([...tasksData, newTask]);
      setUserTask({ id: '', title: "", body: '' }); // Clear input fields
      showTemporaryAlert("success", "✅ Added successfully!");
      setIsLoading(false);
    }, 1000); // Simulate loading time
  };

  return (
    <div className="App" style={{position:'relative'}}>

       <Tasks.Provider value={{tasksData, setTasksData}}>


      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: { xs: '15px', sm: '25px' }, padding: { xs: '20px', sm: '30px', md: '40px' }, marginTop: { xs: '15px', sm: '30px' }, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '25px', fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }, textShadow: '3px 3px 6px rgba(0,0,0,0.2)', fontWeight: 'bold', background: 'linear-gradient(45deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ToDo APP</h1>
          <hr style={{ border: 'none', height: '3px', background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)', marginBottom: { xs: '25px', sm: '35px' }, borderRadius: '2px' }}></hr>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
            <Link to="/all" style={{ textDecoration: 'none' }}>
              <Button
                variant={location.pathname === '/all' ? 'contained' : 'outlined'}
                startIcon={<ViewListIcon />}
                sx={{
                  borderRadius: '25px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: location.pathname === '/all' ? 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' : 'transparent',
                  color: location.pathname === '/all' ? 'white' : '#667eea',
                  border: location.pathname === '/all' ? 'none' : '2px solid #667eea',
                  boxShadow: location.pathname === '/all' ? '0 4px 15px rgba(102, 126, 234, 0.4)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    backgroundColor: location.pathname === '/all' ? 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)' : 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                All
              </Button>
            </Link>
            <Link to="/completed" style={{ textDecoration: 'none' }}>
              <Button
                variant={location.pathname === '/completed' ? 'contained' : 'outlined'}
                startIcon={<CheckCircleIcon />}
                sx={{
                  borderRadius: '25px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: location.pathname === '/completed' ? 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)' : 'transparent',
                  color: location.pathname === '/completed' ? 'white' : '#4caf50',
                  border: location.pathname === '/completed' ? 'none' : '2px solid #4caf50',
                  boxShadow: location.pathname === '/completed' ? '0 4px 15px rgba(76, 175, 80, 0.4)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    backgroundColor: location.pathname === '/completed' ? 'linear-gradient(45deg, #43a047 30%, #5cb85c 90%)' : 'rgba(76, 175, 80, 0.1)',
                  },
                }}
              >
                Completed
              </Button>
            </Link>
            <Link to="/pending" style={{ textDecoration: 'none' }}>
              <Button
                variant={location.pathname === '/pending' ? 'contained' : 'outlined'}
                startIcon={<PendingIcon />}
                sx={{
                  borderRadius: '25px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: location.pathname === '/pending' ? 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)' : 'transparent',
                  color: location.pathname === '/pending' ? 'white' : '#ff9800',
                  border: location.pathname === '/pending' ? 'none' : '2px solid #ff9800',
                  boxShadow: location.pathname === '/pending' ? '0 4px 15px rgba(255, 152, 0, 0.4)' : '0 2px 10px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    backgroundColor: location.pathname === '/pending' ? 'linear-gradient(45deg, #f57c00 30%, #ffb347 90%)' : 'rgba(255, 152, 0, 0.1)',
                  },
                }}
              >
                Pending
              </Button>
            </Link>
          </Stack>
          {alert.show && (
        <Stack style={{marginTop:{ xs: '10px', sm: '20px' } ,borderRadius:'20px'}} sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert style={{borderRadius:'20px'}} severity={alert.type}>{alert.message}</Alert>
        </Stack>
      )}
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={10} md={8}>
              <div className="addtask">
                <TextField
                  fullWidth
                  sx={{ margin: { xs: '5px 0', sm: '10px 0' } }}
                  onChange={(e) => { setUserTask({ ...userTask, title: e.target.value }) }}
                  className="text"
                  id="outlined-basic"
                  label="Add Task Title"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  sx={{ margin: { xs: '5px 0', sm: '10px 0' } }}
                  onChange={(e) => { setUserTask({ ...userTask, body: e.target.value }) }}
                  className="text"
                  id="outlined-basic"
                  label="Add Task Body"
                  variant="outlined"
                />
                <Button
                  onClick={addTask}
                  variant="contained"
                  fullWidth
                  sx={{
                    marginTop: { xs: 2, sm: 3 },
                    padding: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '25px',
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                    },
                    '&:disabled': {
                      background: 'linear-gradient(45deg, #cccccc 30%, #aaaaaa 90%)',
                      color: '#666',
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Task'}
                </Button>
              </div>
            </Grid>
          </Grid>
       
        </Container>
      </React.Fragment>












       {/* Routes */}
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/all" element={<All />} />
        <Route path="/pending" element={<Pending  />} />
        <Route path="/completed" element={<IsDone />} />
      </Routes>

      
      </Tasks.Provider>
       
    </div>
  );
}

export default App;
