import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User"

class UserController {

    private userRepository = getRepository(User);

    public getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {

            const users = await this.userRepository.find(); 

            return res.json(users);


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
            const { username, password } = req.body;

            const employeeCreate = this.userRepository.create({
                username,
                password
            });

            const user = await this.userRepository.save(employeeCreate);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

}

export default new UserController();