// import { WebhookRequestBody, Client } from '@line/bot-sdk'

// // 実行時に必要なパラメータを環境変数から取得
// const config = useRuntimeConfig()
// const channel = {
//   channelSecret: config.public.channelSecret,
//   channelAccessToken: config.public.channelAccessToken
// }

// if (!channel.channelSecret || !channel.channelSecret) {
//   throw new Error('Environment variables for CHANNEL_SECRET and CHANNEL_ACCESS_TOKEN must be set')
// }

// export default defineEventHandler(async (event) => {
//   if (event.node.req.method !== 'POST') {
//     event.res.writeHead(405, { 'Content-Type': 'application/json' })
//     event.res.end(JSON.stringify({ message: 'Only POST method is allowed' }))
//     return
//   }

//   // LINE Messaging API Clientの初期化
//   const lineClient = new Client({
//     channelSecret: channel.channelSecret,
//     channelAccessToken: channel.channelAccessToken
//   })

//   // ユーザーがbotに送ったメッセージをそのまま返す
//   const body = JSON.parse(await readBody(event))
//   const events = (body as WebhookRequestBody).events
//   events.forEach((event) => {
//     switch (event.type) {
//       case 'message': {
//         const { replyToken, message } = event
//         if (message.type === 'text') {
//           lineClient.replyMessage(replyToken, { type: 'text', text: message.text })
//         }
//         break
//       }
//       default:
//         break
//     }
//   })

//   try {
//     event.res.writeHead(200, { 'Content-Type': 'application/json' })
//     event.res.end(JSON.stringify({ message: 'HTTP POST request sent to the webhook URL!' }))
//   } catch (error) {
//     console.error(error)
//     event.res.writeHead(500, { 'Content-Type': 'application/json' })
//     event.res.end(JSON.stringify({ message: 'Internal Server Error' }))
//   }
// })


// import { WebhookRequestBody, Client } from '@line/bot-sdk'

// // 実行時に必要なパラメータを環境変数から取得
// const config = useRuntimeConfig()
// const channel = {
//   channelSecret: config.public.channelSecret,
//   channelAccessToken: config.public.channelAccessToken
// }

// if (!channel.channelSecret || !channel.channelSecret) {
//   throw new Error('Environment variables for CHANNEL_SECRET and CHANNEL_ACCESS_TOKEN must be set')
// }

// async function handleMessage(events:any) {
//   // LINE Messaging API Clientの初期化
//   const lineClient = new Client({
//     channelSecret: channel.channelSecret,
//     channelAccessToken: channel.channelAccessToken
//   })

//   for (const event of events) {
//     switch (event.type) {
//       case 'message': {
//         const { replyToken, message } = event
//         if (message.type === 'text') {
//           await lineClient.replyMessage(replyToken, { type: 'text', text: message.text })
//         }
//         break
//       }
//       default:
//         break
//     }
//   }
// }

// export default defineEventHandler(async (event) => {
//   if (event.node.req.method !== 'POST') {
//     event.res.writeHead(405, { 'Content-Type': 'application/json' })
//     event.res.end(JSON.stringify({ message: 'Only POST method is allowed' }))
//     return
//   }

//   try {
//     const body = JSON.parse(await readBody(event))
//     const events = (body as WebhookRequestBody).events

//     // メッセージの処理を別の非同期関数で行い、完了を待つ
//     await handleMessage(events)

//     event.res.writeHead(200, { 'Content-Type': 'application/json' })
//     event.res.end(JSON.stringify({ message: 'HTTP POST request sent to the webhook URL!' }))
//   } catch (error) {
//     console.error(error)
//     event.res.writeHead(500, { 'Content-Type': 'application/json' })
//     event.res.end(JSON.stringify({ message: 'Internal Server Error' }))
//   }
// })

// import { WebhookRequestBody, Client } from "@line/bot-sdk";

// // 実行時に必要なパラメータを環境変数から取得
// const config = useRuntimeConfig();
// const channel = {
//   channelSecret: config.public.channelSecret,
//   channelAccessToken: config.public.channelAccessToken,
// };


// export default defineEventHandler(async (event) => {
//   // const { test } = useAuth()
//   if (event.node.req.method !== "POST") {
//     event.res.writeHead(405, { "Content-Type": "application/json" });
//     // event.res.end(JSON.stringify({ message: "Only POST method is allowed" }));
//     return;
//   }
//   // test.value = "test"
//   event.res.writeHead(200, { "Content-Type": "application/json" });
//   // event.res.end(JSON.stringify({ message: "HTTP POST request sent to the webhook URL!" }));

//   // LINE Messaging API Clientの初期化
//   const lineClient = new Client({
//     channelSecret: channel.channelSecret,
//     channelAccessToken: channel.channelAccessToken,
//   });

//   // ユーザーがbotに送ったメッセージをそのまま返す
//   const body = JSON.parse(await readBody(event));
//   const events = (body as WebhookRequestBody).events;
//   events.forEach((event) => {
//     switch (event.type) {
//       case "message": {
//         const { replyToken, message } = event;
//         if (message.type === "text") {
//           lineClient.replyMessage(replyToken, { type: "text", text: message.text });
//         }

//         break;
//       }
//       default:
//         break;
//     }
//   });
// });

// import { WebhookRequestBody, Client } from "@line/bot-sdk" 
// import { Configuration, OpenAIApi } from 'openai'

// export default defineEventHandler((event:any) => {

//   event.node.res.sendStatus(200)

//   const { channelSecret, channelAccessToken } = useRuntimeConfig().private

//   const lineClient = new Client({
//     channelSecret: channelSecret,
//     channelAccessToken: channelAccessToken,
//   })

//   const { events } = event.node.req.body as WebhookRequestBody

//   events.forEach((event) => {

//     if (event.type === 'message') {

//       const { replyToken, message } = event

//       if (message.type === 'text') {

//         switch (message.text) {
//         case "入室しました": {
//           lineClient.replyMessage(replyToken, {type: "text", text: "入室時の金額を入力"})
//           break
//         }
//         case "退出しました": {
//           lineClient.replyMessage(replyToken, {type: "text", text: "お疲れ様でした"})
//           break
//         }
//         default:
//           break
//         }
//       }
//     }
//   })

//   event.node.res.end()

// })

import { WebhookRequestBody, Client } from '@line/bot-sdk';
import { Configuration, OpenAIApi } from 'openai';

const { channelSecret, channelAccessToken } = useRuntimeConfig().private;
const { openaiApiKey } = useRuntimeConfig().public;

const openaiConfig = new Configuration({
  apiKey: openaiApiKey,
});

async function generateResponse(prompt: string) {
  const openaiInstance = new OpenAIApi(openaiConfig);

  const response = await openaiInstance.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 506,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  return response.data.choices[0].text?.trim() || '';

}

export default defineEventHandler((event: any) => {
  event.node.res.sendStatus(200);

  const lineClient = new Client({   
    channelSecret: channelSecret,
    channelAccessToken: channelAccessToken,
  });

  const { events } = event.node.req.body as WebhookRequestBody;
  events.forEach(async (event) => {
    if (event.type === 'message') {
      const { replyToken, message } = event;

      if (message.type === 'text') {
        let replyText;

        switch (message.text) {
          case '入室しました': {
            replyText = '入室時の金額を入力';
            break;
          }
          case '退出しました': {
            replyText = 'お疲れ様でした';
            break;
          }
          default: {
            // OpenAI API を使用して応答を生成
            // replyText = '何で？'
            const prompt = `
            ${message.text}
            `.trim();
            replyText = await generateResponse(prompt);

            break;
          }
        }

        lineClient.replyMessage(replyToken, { type: 'text', text: replyText });
      }
    }
  });

  event.node.res.end();
});


