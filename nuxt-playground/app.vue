<script setup lang="ts">
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

</script>
<template>
  <div>
    <button @click="generateKey">
      push
    </button>
  </div>
</template>
