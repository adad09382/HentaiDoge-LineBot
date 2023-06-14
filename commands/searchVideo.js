import puppeteer from "puppeteer";
import template from "../templates/lineFlexMessage.js";
// 製作一個計時器
const waitForTimeOut = (t) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`經過了${t / 1000}秒`);
      resolve(); // 解析Promise
    }, t)
  );

export default async (event) => {
  try {
    //flex消息模板，bubble
    const bubble = JSON.parse(JSON.stringify(template));
    //將收到的信息存到text
    let text = event.message.text;
    console.log(text);
    console.log(typeof text);
    //取出/s 後的所有內容
    let videoId = text.trim().slice(3).toLowerCase();
    let videoLink = `https://jable.tv/videos/${videoId}/`;
    (async () => {
      // 使用自訂的 Chrome
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--start-maximized"],
        defaultViewport: null,
      });
      const page = await browser.newPage(); // 開啟新分頁
      //設定UserAgent
      await page.setUserAgent(
        `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`
      );

      await page.goto(videoLink); // 進入指定頁面
      // 模擬真人用戶
      await waitForTimeOut(3000); // 等待5秒钟
      await page.mouse.move(100, 100); // 模拟鼠标移动到指定位置
      await page.evaluate(() => window.scrollBy(0, 200)); // 模拟滚动页面
      await page.setJavaScriptEnabled(true); // 启用 JavaScript
      const title = await page.title();
      if (title.includes("404")) {
        console.log("網頁不存在");
        event.reply(`在本站查無此番`);
      } else {
        // 獲得影片title
        const endIndex = await title.indexOf(" - Jable.TV");
        const extractedTitle = await title.substring(0, endIndex);
        await page.waitForSelector("#player"); //等待該選擇器出現
        //獲得影片圖片
        const imageUrl = await page.$eval("#player", (el) => el.poster);

        //修改bubble 預設值
        bubble.contents[0].body.contents[0].url = imageUrl; //改JSON圖片
        bubble.contents[0].body.contents[1].contents[0].contents[0].text =
          extractedTitle; //改JSON標題
        bubble.contents[0].body.contents[1].contents[1].contents[1].action.uri =
          videoLink; //改JSON LINK

        event.reply({
          type: "flex",
          altText: extractedTitle,
          contents: bubble,
        });
        console.log(`
      影片標題：${extractedTitle}
      影片網址：${videoLink}
      影片圖片：${imageUrl}
      `);
        await page.screenshot({ path: "Line.png" }); // 截圖，並且存在...
      }

      await browser.close(); // 關閉瀏覽器
    })();
  } catch (error) {
    console.log("發生錯誤");
    console.log(error);
  }
};
