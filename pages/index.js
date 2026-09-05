// pages/index.js
import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handlePay = async () => {
    setLoading(true);
    const res = await fetch("/api/stkpush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount })
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">💳 Beltah Pay</h1>
      <p className="subtitle">Secure M-PESA Payments</p>

      <input
        type="text"
        placeholder="2547XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />

      <button onClick={handlePay} className={`payButton ${loading ? "loading" : ""}`}>
        {loading ? "Processing..." : "Request Payment"}
      </button>

      <pre className="response">{response}</pre>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 80px auto;
          padding: 30px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          text-align: center;
        }
        .title { color: #006f3c; font-size: 2rem; }
        .subtitle { color: #333; margin-bottom: 20px; }
        .input {
          width: 100%; padding: 12px; margin: 10px 0;
          border: 2px solid #006f3c; border-radius: 8px;
        }
        .payButton {
          background: #006f3c; color: white; padding: 12px 24px;
          border: none; border-radius: 8px; font-size: 16px;
          cursor: pointer; transition: transform 0.2s ease;
        }
        .payButton:hover { transform: scale(1.05); background: #00994d; }
        .payButton.loading { background: #ccc; cursor: not-allowed; }
        .response {
          text-align: left; margin-top: 20px; font-size: 14px;
          background: #f0f0f0; padding: 10px; border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

