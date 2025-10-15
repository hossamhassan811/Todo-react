import Container from "@mui/material/Container";
import Card from "./Card";
import { Tasks } from "./ListContext";
import { useContext } from "react";



export default function IsDone() {
const { tasksData } = useContext(Tasks);
const filteredTasks = tasksData.filter((task) => task.isDone === true);

  return (
    <Container maxWidth="sm">
      <Card list={filteredTasks} />
    </Container>
  );
}
