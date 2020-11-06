

import { Response, NextFunction, Request } from "express";
import { promisify } from "util";
import { getRepository } from "typeorm";
import { User } from "../models/User"
import jwt = require('jsonwebtoken');
require("dotenv").config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    let userRepository = getRepository(User);

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ auth: false, message: "No tokens provided!" });
    }

    const token = authHeader.split(" ")[1];


    try {
        const decoded: { id?: number } = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );

        const user = userRepository.findOne({ id: decoded.id });

        if (!user) {
            return res.status(401).send({ auth: false, message: "User does not exist!" });
        }

        return next();

    } catch (err) {
        return res.status(401).send({ auth: false, message: "Invalid token" });
    }
};