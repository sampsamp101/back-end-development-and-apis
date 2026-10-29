import express from "express";
import jwt from "jsonwebtoken";

import { findByUsername } from "../utils/db.js";

const router = express.Router();

//req = contains the incoming request, including json body
//res = send a response back to client.
router.post('/login',(req,res)=>{
    const {username, password} = req.body;
    const user = findByUsername(username);

    if (!username || !password){
        return res.status(400).json({message: "missing username or missing password!"});
    }   
    else if (!findByUsername(username)){
        return res.status(401).json({message: "triggered username not found in database"});
    }
    else if (findByUsername(username) && password !== user._password){
        return res.status(401).json({message: `triggered correct user but wrong password`});
    }
    const payload = {
        id: user.id,
        role: user.role,
    };
    const tokenSigned = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: ("1d")});

    return res.status(200).json({token: tokenSigned});
});

export default router;