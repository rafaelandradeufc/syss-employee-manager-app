import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Employee } from "../models/Employee"

class EmployeeController {

    private employeeRepository = getRepository(Employee);

    public getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {

            const employees = await this.employeeRepository.find(); 

            return res.json(employees);


        } catch (error) {
            next(error);
        }
    };

    public getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {

            const { id } = req.params;

            const employee = await this.employeeRepository.findOne(id);

            if (!employee) {
                return res.status(404).json({ message: "Employee not found!" });
            }

            return res.json(employee);


        } catch (error) {
            next(error);
        }
    };


    public add = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {
            const { name, email, department, salary, birth_date } = req.body;

            const employeeCreate = this.employeeRepository.create({
                name,
                email,
                department,
                salary,
                birth_date

            });

            const employee = await this.employeeRepository.save(employeeCreate);

            return res.status(200).json(employee);
        } catch (error) {
            next(error);
        }
    };


    public update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {

            const { id } = req.params;
            const { name, email, department, salary, birth_date } = req.body;

            const employee = await this.employeeRepository.findOne(id);

            if (!employee) {
                return res.status(404).json({ message: "Employee not found!" });
            }

            this.employeeRepository.merge(employee,
                {
                    name,
                    email,
                    department,
                    salary,
                    birth_date
                })

            const newEmployee = await this.employeeRepository.save(employee);

            return res.json(newEmployee);


        } catch (error) {
            next(error);
        }
    };

    public delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {

            const { id } = req.params;

            const employee = await this.employeeRepository.findOne(id);

            if (!employee) {
                return res.status(404).json({ message: "Employee not found!" });
            }

            this.employeeRepository.delete(employee);

            return res.json(employee);


        } catch (error) {
            next(error);
        }
    };

}

export default new EmployeeController();