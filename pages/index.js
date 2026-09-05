import { useState } from "react";
import styles from "../styles/globals.css";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePay = async () => {
    setLoading(true);
    const res = await fetch("/api/stkpush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount })
    });
    const data = await res.json();
    setMessage(JSON.stringify(data, null, 2));
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">💳 Beltah Pay</h1>
      <p className="subtitle">Powered by Safaricom M-PESA</p>

      <input
        type="text"
        placeholder="Enter phone (2547XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />

      <button onClick={handlePay} className={`payButton ${loading ? "loading" : ""}`}>
        {loading ? "Requesting..." : "Request Payment"}
      </button>

      <pre className="response">{message}</pre>
    </div>
  );
}
