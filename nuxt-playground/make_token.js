const jose = require("node-jose");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const makeJWT = async () => {
  const privateKey = JSON.parse(
    fs.readFileSync(path.join(__dirname, "assertion-private.key.json"))
  );

  const header = {
    alg: "RS256",
    typ: "JWT",
    kid: process.env.KID, // チャネル基本設定＞アサーション署名キー
  };

  const payload = {
    iss: process.env.CHANNEL_ID, // チャネルID
    sub: process.env.CHANNEL_ID, // チャネルID
    aud: "https://api.line.me/",
    exp: Math.floor(new Date().getTime() / 1000) + 60 * 25, // JWTの有効期間（UNIX時間）
    token_exp: 60 * 60 * 24 * 30, // チャネルアクセストークンの有効期間
  };

  const jwt = await jose.JWS.createSign(
    { format: "compact", fields: header },
    privateKey
  )
    .update(JSON.stringify(payload))
    .final();

  return jwt;
};

const createToken = async (jwt) => {
  const accessTokenUrl = "https://api.line.me/oauth2/v2.1/token";
  const response = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_assertion_type:
        "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_assertion: jwt,
    }).toString(),
  });

  return response;
};

(async () => {
  const jwt = await makeJWT();
  const accessTokenResponse = await createToken(jwt);
  console.log(await accessTokenResponse.json());
})();

