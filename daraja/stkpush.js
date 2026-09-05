import fetch from "node-fetch";

export default async function stkpush(phone, amount) {
  const consumerKey = process.env.DARAJA_CONSUMER_KEY;
  const consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
  const shortcode = "7968544"; // Your Till Number
  const passkey = process.env.DARAJA_PASSKEY;

  // 1. Get OAuth token
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const tokenRes = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const { access_token } = await tokenRes.json();

  // 2. Generate password
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
  const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

  // 3. STK Push request
  const stkRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: "https://your-vercel-app.vercel.app/api/callback",
      AccountReference: "BeltahPay",
      TransactionDesc: "Payment via Beltah Pay"
    })
  });

  return await stkRes.json();
}
