import dotenv from "dotenv";
dotenv.config();

// 引用套件
import linebot from "linebot";
import searchVideo from "./commands/searchVideo.js";

// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// 當收到訊息時，event 包含了訊息的類型、文字等
bot.on("message", (event) => {
  // event.message.text 為使用者傳送的文字

  if (event.message.type == "text" && event.message.text.slice(0, 3) == "/s ") {
    try {
      searchVideo(event);
    } catch (error) {
      console.log(error);

      event.reply("發生錯誤");
    }
  } else {
    event.reply("輸入格式錯誤");
  }
});

// 設定機器人監聽 port
bot.listen("/", process.env.PORT || 3050, () => {
  console.log("Serve在3050上running");
});
