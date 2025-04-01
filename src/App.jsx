import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Veuillez entrer un nom de tâche")
    .min(8, "Minimum 8 caractères")
    .max(15, "Maximum 15 caractères"),

  dueDate: yup
    .string()
    .required("Veuillez entrer une date")
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/, 
      "Format attendu : jj/mm/aaaa"
    )
    .test("is-valid-date", "la date ne doit pas être antérieure au jour actuel", (value) => {
      const [day, month, year] = value.split("/").map(Number);
      const inputDate = new Date(year, month - 1, day);
      return inputDate >= today;
    }),

  priority: yup
    .string()
    .required("La priorité est requise")
    .oneOf(["Basse", "Moyenne", "Élevée"], "Valeur non autorisée"),

  isCompleted: yup.boolean()
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      priority: "Basse",
      isCompleted: false
    }
  });

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
            {...register("name")}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDate">
          <Form.Label>Date (jj/mm/aaaa) *</Form.Label>
          <Form.Control
            type="text"
            placeholder="jj/mm/aaaa"
            {...register("dueDate")}
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
          {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
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
