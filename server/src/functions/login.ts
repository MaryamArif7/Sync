import { Response } from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";
import admin from "../firebase/firebase";
import User from "../models/userModel";
import redisClient from "../cache/redis";
const jwt_secret = process.env.JWT_SECRET || "";
export const login =async (req: Request, res: Response)=> {
    const session = req.cookies.syncId || req.headers.authorization;
    console.log(session);
    console.log(req.cookies);
     console.log(req);
    if (session) {
        const decoded = jwt.verify(session, process.env.JWT_SECRET || "");
        if (decoded) {
            return res.status(200).send("Already Logged In");
        }
    }
    const { token } = req.body;
    if (!token) {
        throw new Error("Try Again");
    }
    const verify = await admin.auth().verifyIdToken(token);
    if (!verify) {
        throw new Error("Invalid Token");
    }
    const alreadyUser = await User.findOne({ email: verify.email }).select("_id");
    if (alreadyUser) {
        return await setTokens(res, alreadyUser);
    }
    else {
        if (!verify.name || !verify.email || !verify.picture)
            throw new Error("Invalid Data");
        const user = await User.create({
            username: verify.email
                ?.split("@gmail.com")[0]
                ?.replace(/[^a-zA-Z0-9]/g, ""),
            name: verify.name,
            email: verify.email,
            imageUrl: verify.picture,
        });
        if (user) {
            return await setTokens(res, user);
        }
        else {
            throw new Error("unable to create the User,Try Again !!")
        }
    }
}
export const setTokens = async (res: Response, alreadyUser: any,
    // url:string
    // 
) => {
    const url=null;
    const accessToken = jwt.sign({ userId: alreadyUser._id }, jwt_secret, {
        expiresIn: "30d",
    });
    await redisClient.del(alreadyUser._id.toString());
    const cookieExpire = new Date();
    res.cookie("syncId", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        expires: cookieExpire,
    });
    if(url){
        return res.redirect(url+"syncId"+accessToken);
    }
    return res.json({ token: accessToken });
}