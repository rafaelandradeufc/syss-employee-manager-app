import { Router } from "express";
import employees from "./employees.routes";
import reports from "./reports.routes";



const routes = Router();

// Get routes
routes.use("/employees", employees);
routes.use("/reports",reports)

export default routes;