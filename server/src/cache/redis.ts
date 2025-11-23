import {Redis as upstash} from "@upstash/redis";
import Redis from "node-cache";
import { configDotenv } from "dotenv";
configDotenv();
export const upstashClient=new upstash({
    url:process.env.UPSTASH_REDIS_REST_URL,
    token:process.env.UPSTASH_REDIS_REST_TOKEN,
})
const redisClient=new Redis();
export default redisClient;