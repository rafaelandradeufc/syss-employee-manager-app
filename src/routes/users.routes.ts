import { Router } from "express";
import UserController from "../controllers/UserController"
import { auth } from "../middlewares/auth";

const routes = Router();

routes.get("/", [auth], UserController.getAll);
routes.post("/", UserController.add);

export default routes;