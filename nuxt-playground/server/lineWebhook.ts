// import { WebhookRequestBody, Client } from '@line/bot-sdk'

// // 実行時に必要なパラメータを環境変数から取得
// const config = {
//   channelSecret: process.env.CHANNEL_SECRET || '',
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || ''
// }

// if (!config.channelSecret || !config.channelAccessToken) {
//   throw new Error('Environment variables for CHANNEL_SECRET and CHANNEL_ACCESS_TOKEN must be set')
// }

// export default defineEventHandler(async (event) => {
//   if (event.node.req.method !== 'POST') {
//     event.res.writeHead(405, { 'Content-Type': 'application/json' })
//     event.res.end(JSON.stringify({ message: 'Only POST method is allowed' }))
//     return
//   }

//   event.res.writeHead(200, { 'Content-Type': 'application/json' })
//   event.res.end(JSON.stringify({ message: 'HTTP POST request sent to the webhook URL!' }))

//   // LINE Messaging API Clientの初期化
//   const lineClient = new Client({
//     channelSecret: config.channelSecret,
//     channelAccessToken: config.channelAccessToken
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
// })

