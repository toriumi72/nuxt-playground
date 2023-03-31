<script setup lang="ts">
// (async () => {
//   const pair = await crypto.subtle.generateKey(
//     {
//       name: 'RSASSA-PKCS1-v1_5',
//       modulusLength: 2048,
//       publicExponent: new Uint8Array([1, 0, 1]),
//       hash: 'SHA-256'
//     },
//     true,
//     ['sign', 'verify']
//   );

//   console.log('=== private key ===');
//   console.log(JSON.stringify(await crypto.subtle.exportKey('jwk', pair.privateKey), null, '  '));

//   console.log('=== public key ===');
//   console.log(JSON.stringify(await crypto.subtle.exportKey('jwk', pair.publicKey), null, '  ')); 
// })();

//上記のコードをcomposition-apiで書くと以下のようになる
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

</script>
<template>
  <div>
    <button @click="generateKey">
      push
    </button>
  </div>
</template>
