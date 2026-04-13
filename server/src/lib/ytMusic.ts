import YTMusic from "ytmusic-api";

const ytmusic = new YTMusic();

export const ytmusicReady = ytmusic.initialize();

export default ytmusic;