import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai'

const generatePrompt = (animal: string) => `
${animal}
`.trim()


export default defineEventHandler(async (event) => {
  const { openaiApiKey: apiKey } = useRuntimeConfig().public
  const { animal = '' } = await readBody(event)

  if (!animal) {
    return event.node.res.end('No animal provided')
  }

  const configuration = new Configuration({ apiKey })
  const openai = new OpenAIApi(configuration)

  // OpenAI config
  const model = 'text-davinci-003'
  const prompt = generatePrompt(animal)
  const temperature = 0.5

  const completion = await openai.createCompletion({
    model,
    prompt,
    temperature,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  const result = completion.data.choices[0].text?.trim() || ''

  return {
    result,
  }
})