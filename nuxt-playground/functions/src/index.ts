import {https,} from "firebase-functions";
import {defineString} from "firebase-functions/params";
import {WebhookRequestBody, Client} from "@line/bot-sdk";

// 実行時に必要なパラメータを定義
const config = {
  channelSecret: defineString("CHANNEL_SECRET"),
  channelAccessToken: defineString("CHANNEL_ACCESS_TOKEN"),
};

export const webhook = https.onRequest((req, res) => {
  res.send("HTTP POST request sent to the webhook URL!");

  // LINE Messaging API Clientの初期化
  const lineClient = new Client({
    channelSecret: config.channelSecret.value(),
    channelAccessToken: config.channelAccessToken.value(),
  });

  // ユーザーがbotに送ったメッセージをそのまま返す
  const {events} = req.body as WebhookRequestBody;
  events.forEach((event) => {
    switch (event.type) {
    case "message": {
      const {replyToken, message} = event;
      if (message.type === "text") {
        lineClient.replyMessage(replyToken, {type: "text", text: message.text});
      }

      break;
    }
    default:
      break;
    }
  });
});