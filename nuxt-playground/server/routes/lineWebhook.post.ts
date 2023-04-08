import { WebhookRequestBody, Client } from '@line/bot-sdk';
import { Configuration, OpenAIApi } from 'openai';

const { channelSecret, channelAccessToken } = useRuntimeConfig().private;
const { openaiApiKey } = useRuntimeConfig().public;

const openaiConfig = new Configuration({
  apiKey: openaiApiKey,
});

const chatData:any = [];

async function generateResponse(message: string) {
  const openaiInstance = new OpenAIApi(openaiConfig);

  const messages = chatData.map((messageObj: { role: string; content: string }) => messageObj);

  messages.push(
    {role: "system", content: "あなたは、優秀な執事です。相手はお姫様です。"},
    {role: "system", content: "会話の相手のことは、お嬢と呼んでください。"},
    {role: "system", content: "あなたは、お嬢のことが大好きで、愛が溢れてしまい、毎回好きと伝えます。"},
    {role: "user", content: message},
  );

  const completion = await openaiInstance.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 180,
    messages: messages,
  });

  return completion.data.choices[0].message?.content || '';
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
            replyText = await generateResponse(message.text);
            break;
          }
        }

        chatData.push({ role: "user", content: replyText });

        lineClient.replyMessage(replyToken, { type: 'text', text: replyText });
      }
    }
  });

  event.node.res.end();
});



