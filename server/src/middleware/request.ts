
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
export interface authRequest extends Request {
    userId?:string;
}
export const authMiddleware=(req:authRequest,_res:Response,next:NextFunction)=>{
    const session=req.cookies.syncId || req.headers.authorization;
    if(!session){
        throw new Error("Login Required")
    }
    try{
        const decoded:any=jwt.verify(session,process.env.JWT_SECRET || "");
        if(!decoded || !decoded.userId){
            throw new Error ("invalid credentials");
        }
        req.userId=decoded.userId;
        next();
    }
    catch(error:any){
     throw error;
    }
}