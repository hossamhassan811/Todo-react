import Container from "@mui/material/Container";
import Card from "./Card";
import { Tasks } from "./ListContext";
import { useContext } from "react";

export default function All() {
  const { tasksData } = useContext(Tasks);


  return (
    <Container maxWidth="sm">
      <Card list={tasksData} />
    </Container>
  );
}
