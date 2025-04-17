import { Router } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { saveUserToDb, findUserByKey } from "../data-access/users.data-access.js";

dotenv.config();

const router = Router();

router.post('/signup', async(req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        res.status(400).send({
            message: "All Fields are mandatory"
        })
    }
    try {
        const userCheck = await findUserByKey("email",email);
        if(userCheck) {
            console.log("UserCheck", userCheck);
            return res.status(409).send({
                error: "Email already exists"
            })
        }
        const saltedRounds = parseInt(process.env.SALTED_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltedRounds);

        const user = {
            username,
            email,
            password: hashedPassword
        }

        const newUser = await saveUserToDb(user);
        if(newUser) {
            const token = jwt.sign({
                    id: newUser.userId,
                    username: newUser.username,
                    email: newUser.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.status(201).send({
                message: "User added successfully",
                token
            })
        } else {
            res.status(500).send({
                error: "Failed to add user"
            })
        }
    } catch(err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        })
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send({
            error: "Email and Password are required"
        });
    }

    const checkUser = await findUserByKey("email", email);
    if(!checkUser) {
        return res.status(404).send({
            error: "User not found. Please sign-up first"
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (isPasswordMatch) {
        const token = jwt.sign({
            id: checkUser.userId,
            username: checkUser.username,
            email: checkUser.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).send({
            message: "successfully logged in",
            user: {
                id: checkUser.userId,
                username: checkUser.username,
                email: checkUser.email
            },
            token
        });
    } else {
        return res.status(400).send({
            error: "Invalid Password"
        })
    }
});

export default router;