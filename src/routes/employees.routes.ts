import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController"



const routes = Router();

routes.get("/", EmployeeController.getAll);
routes.get("/:id",EmployeeController.getById);
routes.post("/", EmployeeController.add);
routes.put("/:id", EmployeeController.update);
routes.delete("/:id", EmployeeController.delete);

export default routes;