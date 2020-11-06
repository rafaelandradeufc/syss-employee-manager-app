import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User"
import jwt = require("jsonwebtoken");


class AuthController {

    private userRepository = getRepository(User);

    public authentication = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> => {
        try {

            const { username, password } = req.body;

            const user = await this.userRepository.findOne({ username: username });

            if (user) {

                if (user.compareHash(password)) {

                    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
                        {
                            expiresIn: 999999,
                        });

                    return res.json({ auth: true, token: token });
                }

                res.status(500).json({ message: "Invalid password!" });

            }

            res.status(500).json({ message: "Invalid user!" });


        } catch (error) {
            next(error);
        }
    };

}

export default new AuthController();