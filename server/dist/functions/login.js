"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTokens = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebase_1 = __importDefault(require("../firebase/firebase"));
const userModel_1 = __importDefault(require("../models/userModel"));
const redis_1 = __importDefault(require("../cache/redis"));
const jwt_secret = process.env.JWT_SECRET || "";
const login = async (res, req) => {
    const session = req.cookies.syncId || req.headers.authorization;
    if (session) {
        const decoded = jsonwebtoken_1.default.verify(session, process.env.JWT_SECRET || "");
        if (decoded) {
            return res.status(200).send("Already Logged In");
        }
    }
    const { token } = req.body;
    if (!token) {
        throw new Error("Try Again");
    }
    const verify = await firebase_1.default.auth().verifyIdToken(token);
    if (!verify) {
        throw new Error("Invalid Token");
    }
    const alreadyUser = await userModel_1.default.findOne({ email: verify.email }).select("_id");
    if (alreadyUser) {
        return await (0, exports.setTokens)(res, alreadyUser);
    }
    else {
        if (!verify.name || !verify.email || !verify.picture)
            throw new Error("Invalid Data");
        const user = await userModel_1.default.create({
            username: verify.email
                ?.split("@gmail.com")[0]
                ?.replace(/[^a-zA-Z0-9]/g, ""),
            name: verify.name,
            email: verify.email,
            imageUrl: verify.picture,
        });
        if (user) {
            return await (0, exports.setTokens)(res, user);
        }
        else {
            throw new Error("unable to create the User,Try Again !!");
        }
    }
};
exports.login = login;
const setTokens = async (res, alreadyUser) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId: alreadyUser._id }, jwt_secret, {
        expiresIn: "30d",
    });
    await redis_1.default.del(alreadyUser._id.toString());
    const cookieExpire = new Date();
    res.cookie("syncId", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        expires: cookieExpire,
    });
    // if(url){
    //     return res.redirect(url+"syncId"+accessToken);
    // }
    return res.json({ token: accessToken });
};
exports.setTokens = setTokens;
