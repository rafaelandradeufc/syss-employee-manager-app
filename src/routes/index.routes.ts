import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { auth } from "../middlewares/auth";
import employees from "./employees.routes";
import reports from "./reports.routes";
import users from "./users.routes"

const routes = Router();

routes.use("/employees", [auth], employees);
routes.use("/reports", [auth], reports);
routes.use("/users", users)
routes.use("/auth", AuthController.authentication);

export default routes;