"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const spotify_1 = __importDefault(require("../lib/spotify"));
const getAccessToken = async () => {
    const token = spotify_1.default.clientCredentialsGrant();
    return token;
};
exports.getAccessToken = getAccessToken;
