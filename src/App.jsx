import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log("Données du formulaire :", data);
    reset();
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Ajouter une tâche</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Nom *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            {...register("name", { required: "Veuillez entrer un nom de tâche" })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDate">
          <Form.Label>Date *</Form.Label>
          <Form.Control
            type="date"
            {...register("dueDate", { required: "Veuillez entrer une date" })}
          />
          {errors.dueDate && <p className="text-danger">{errors.dueDate.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register("priority")}> 
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Élevée">Élevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskCompleted">
          <Form.Check
            type="checkbox"
            label="Tâche complétée"
            {...register("isCompleted")}
          />
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="primary">
            Ajouter
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default App;
