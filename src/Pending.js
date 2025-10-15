import Container from "@mui/material/Container";
import Card from "./Card";
import { Tasks } from "./ListContext";
import { useContext } from "react";


export default function Pending() {
const { tasksData } = useContext(Tasks);
const filteredTasks = tasksData.filter((task) => task.isDone === false);

  return (
    <Container maxWidth="sm">
      <Card list={filteredTasks} />
    </Container>
  );
}
