"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtube = void 0;
const youtubei_js_1 = require("youtubei.js");
let ytInstance = null;
const youtube = async () => {
    if (!ytInstance) {
        ytInstance = await youtubei_js_1.Innertube.create({
            cookie: process.env.COOKIES,
        });
    }
    return ytInstance;
};
exports.youtube = youtube;
