import { Router } from "express";
import ReportController from "../controllers/ReportController";



const routes = Router();

routes.get("/employees/age",ReportController.getReportEmployeeAge);
routes.get("/employees/salary",ReportController.getReportEmployeeSalary);

export default routes;