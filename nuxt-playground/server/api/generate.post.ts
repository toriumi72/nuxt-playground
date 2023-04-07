// import { Configuration, OpenAIApi } from 'openai'

// const generatePrompt = (animal: string) => `
// Suggest three names for an animal that is a superhero.
// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${animal}
// Names:
// `.trim()


// export default defineEventHandler(async (event) => {
//   const { openaiApiKey } = useRuntimeConfig().public;
//   const { animal = '' } = await readBody(event)

//   if (!animal) {
//     return event.node.res.end('no')
//   }

//   const configuration = new Configuration({ apiKey })
//   const openai = new OpenAIApi(configuration)

//   // OpenAI config
//   const model = 'text-davinci-002'
//   const prompt = generatePrompt(animal)
//   const temperature = 0.6

//   const completion = await openai.createCompletion({
//     model,
//     prompt,
//     temperature,
//   })

//   const result = completion.data.choices[0].text || ''

//   return {
//     result,
//   }
// })

// // const submit = async () => {
// //   result.value = ''
// //   const method = 'POST'
// //   const body = { animal: animal.value }
// //   const { data } = await useFetch('/api/generate', {
// //     method,
// //     body,
// //   })
// //   result.value = data.value?.result || 'Sorry, Error has occurred'
// // }


// import { Configuration, OpenAIApi } from 'openai';

// export default defineEventHandler(async (event) => {
//   const { openaiApiKey } = useRuntimeConfig().public;
//   const { prompt = '' } = await readBody(event);

//   if (!prompt) {
//     return event.node.res.end('no');
//   }

//   const configuration = new Configuration({ apiKey: openaiApiKey });
//   const openai = new OpenAIApi(configuration);

//   // OpenAI config
//   const model = 'text-davinci-002';
//   const temperature = 0.7;

//   const completion = await openai.createCompletion({
//     model,
//     prompt,
//     temperature,
//   });

//   const result = completion.data.choices[0].text || '';

//   return {
//     result,
//   };
// });


import { Configuration, OpenAIApi } from 'openai'

const generatePrompt = (animal: string) => `
Suggest three names for an animal that is a superhero.
Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${animal}
Names:
`.trim()


export default defineEventHandler(async (event) => {
  const { openaiApiKey: apiKey } = useRuntimeConfig()
  const { animal = '' } = await readBody(event)

  if (!animal) {
    return event.res.end('No animal provided')
  }

  const configuration = new Configuration({ apiKey })
  const openai = new OpenAIApi(configuration)

  // OpenAI config
  const model = 'text-davinci-002'
  const prompt = generatePrompt(animal)
  const temperature = 0.6

  const completion = await openai.createCompletion({
    model,
    prompt,
    temperature,
  })

  const result = completion.data.choices[0].text || ''

  return {
    result,
  }
})