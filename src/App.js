import * as React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import ButtonGroup from "@mui/material/ButtonGroup";
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
        <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: { xs: '10px', sm: '20px' }, padding: { xs: '15px', sm: '20px', md: '30px' }, marginTop: { xs: '10px', sm: '20px' }, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ color: '#333', marginBottom: '20px', fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' }, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>ToDo APP</h1>
          <hr style={{ border: 'none', height: '2px', background: 'linear-gradient(90deg, #667eea, #764ba2)', marginBottom: { xs: '20px', sm: '30px' } }}></hr>
          {alert.show && (
        <Stack style={{marginTop:{ xs: '10px', sm: '20px' } ,borderRadius:'20px'}} sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert style={{borderRadius:'20px'}} severity={alert.type}>{alert.message}</Alert>
        </Stack>
      )}
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={10} md={8}>
              <ButtonGroup
                variant="outlined"
                aria-label="Basic button group"
                fullWidth
                sx={{
                  flexWrap: 'wrap',
                  '& .MuiButton-root': {
                    flex: { xs: '1 1 100%', sm: '1 1 auto' },
                    marginBottom: { xs: 1, sm: 0 },
                  },
                }}
              >
                <Link to="/all" style={{ textDecoration: 'none' }}>
                  <Button variant={location.pathname === '/all' ? 'contained' : 'outlined'} fullWidth>
                    All
                  </Button>
                </Link>
                <Link to="/completed" style={{ textDecoration: 'none' }}>
                  <Button variant={location.pathname === '/completed' ? 'contained' : 'outlined'} fullWidth>
                    Completed
                  </Button>
                </Link>
                <Link to="/pending" style={{ textDecoration: 'none' }}>
                  <Button variant={location.pathname === '/pending' ? 'contained' : 'outlined'} fullWidth>
                    UnCompleted
                  </Button>
                </Link>
              </ButtonGroup>
            </Grid>
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
                  sx={{ marginTop: { xs: 1, sm: 2 } }}
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
