// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  nitro: {
    preset: "firebase",
  },
  runtimeConfig: {
    public: {
      apiKey: "AIzaSyDnB7-4BA_3lY-3hVVO2hDRCDkx0nVXico",
      authDomain: "nuxt-playground-d783b.firebaseapp.com",
      projectId: "nuxt-playground-d783b",
      storageBucket: "nuxt-playground-d783b.appspot.com",
      messagingSenderId: "218892116934",
      appId: "1:218892116934:web:924471127b61bea8c6c8c7",
      measurementId: "G-2WCRRYNXSH",
      //ここに設定はよくない
      openaiApiKey: "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"
    },
    private: {
      CHANNEL_ID:"1660812434",
      KID:"0c723414-440e-4632-81dc-5dcabec2f846",
      channelSecret:"133dd7e73c12249624f89eaf8c8295a1",
      channelAccessToken:"eyJhbGciOiJIUzI1NiJ9.VizSaGFBq7mC-2TNJY8K33tG3cv0Mb1qtRGlyfMo8ScPowbGlbcKagWRHoBDqHm7XrOgTfdMqkxaKaSTyRx8VbPCXtv6TJ7WB4C5KznLRF-jOC05aWnTxuVCrA5G70fP.uhzTWUj53GfCIX68HjgPuzSp4uJQAEiz48ybpKEn_Ew",
      
    }
  }
})
