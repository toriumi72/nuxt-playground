<script setup lang="ts">
// const { test } = useAuth()
const generateKey = async () => {
  const pair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    true,
    ['sign', 'verify']
  );

  console.log('=== private key ===');
  console.log(JSON.stringify(await crypto.subtle.exportKey('jwk', pair.privateKey), null, '  '));

  console.log('=== public key ===');
  console.log(JSON.stringify(await crypto.subtle.exportKey('jwk', pair.publicKey), null, '  ')); 
}

//  チャンネルアクセストークン
// {
//   access_token: 'eyJhbGciOiJIUzI1NiJ9.K4vH2_nRaFcmpVrajF155L95f1YorqXExy2cAVI7ZKHd8aM2P-4ssJq5ZEo1od5CZ4ympd5elCZUMilF3rA1kykeGwE5aXKRi3AouVAV6rBrxXRMESxZ5uqi-U6wx5Vp.s_3O-bEDBRGQhq81K-RWX2dqNVGjmFpgWlqNxZfzjGM',
//   token_type: 'Bearer',
//   expires_in: 2592000,
//   key_id: 'TVV-Ws30oJBfxDp9ZxHjHw'
// }

const name = ref('')
const result = ref('')
const animal = computed(() => name.value[0].toUpperCase() + name.value.slice(1).toLowerCase())
const submit = async () => {
  result.value = ''
  const method = 'POST'
  const body = { animal: animal.value }
  const { data } = await useFetch('/api/generate', {
    // headers:{
      
    // },
    method,
    body,
  })
  result.value = data.value?.result || 'Sorry, Error has occurred'
}


</script>
<template>
  <div>
    <button @click="generateKey">
      push
    </button>
  </div>
  <form @submit.prevent="submit">
    <input v-model="name" placeholder="Enter an animal" />
    <input type="submit" value="Generate names" />
  </form>
  <div>
    {{ result }}
  </div>

</template>

<!-- <script setup lang="ts">
const name = ref('')
const result = ref('')
const animal = computed(() => name.value[0].toUpperCase() + name.value.slice(1).toLowerCase())
const submit = async () => {
  result.value = ''
  const method = 'POST'
  const body = { animal: animal.value }
  const { data } = await useFetch('/api/generate', {
    method,
    body,
  })
  result.value = data.value?.result || 'Sorry, Error has occurred'
}
</script> -->

