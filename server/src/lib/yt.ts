import { Innertube } from "youtubei.js";
let ytInstance:Innertube | null=null;
export const youtube=async()=>{
    if (!ytInstance) {
    ytInstance = await Innertube.create({
      cookie: process.env.COOKIES,
    });
  }
  return ytInstance;
}