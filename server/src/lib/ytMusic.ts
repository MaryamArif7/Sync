import YTMusic from "ytmusic-api";
const ytmusic = new YTMusic();

(async () => {
  await ytmusic.initialize();
})();
export default ytmusic;