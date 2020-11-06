import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Employee } from "../models/Employee"

class ReportController {

    private employeeRepository = getRepository(Employee);

    public getReportEmployeeAge = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {


            const minDate = await this.employeeRepository
                .createQueryBuilder("employee")
                .select("MIN(employee.birth_date)", "birth_date")
                .getRawOne()

            const maxDate = await this.employeeRepository
                .createQueryBuilder("employee")
                .select("MAX(employee.birth_date)", "birth_date")
                .getRawOne()

            const avgDate = await this.employeeRepository
                .createQueryBuilder("employee")
                .select("AVG(YEAR(employee.birth_date))", "average")
                .getRawOne()

            const older = await this.employeeRepository.findOne(minDate)
            const younger = await this.employeeRepository.findOne(maxDate)
            const average = new Date().getFullYear() - avgDate.average;

            return res.json({ younger, older, average });


        } catch (error) {
            next(error);
        }
    };


    public getReportEmployeeSalary = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {


            const minSalary = await this.employeeRepository
                .createQueryBuilder("employee")
                .select("MIN(employee.salary)", "salary")
                .getRawOne()

            const maxSalary = await this.employeeRepository
                .createQueryBuilder("employee")
                .select("MAX(employee.salary)", "salary")
                .getRawOne()

            const avgSalary = await this.employeeRepository
                .createQueryBuilder("employee")
                .select("AVG(employee.salary)", "salary")
                .getRawOne()


            const lowest = await this.employeeRepository.findOne(minSalary);
            const highest = await this.employeeRepository.findOne(maxSalary);
            const average = avgSalary.salary;

            return res.json({ lowest, highest, average });


        } catch (error) {
            next(error);
        }
    };


}

export default new ReportController();