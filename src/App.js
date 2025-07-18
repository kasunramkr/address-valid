import './App.css';
import React, { useState, useEffect } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleVerify = async () => {
    if (address.trim() === "") {
      setResult("⚠️ Please enter an address.");
      return;
    }

    try {
      const response = await fetch("https://1opzd82p8k.execute-api.ap-southeast-2.amazonaws.com/dev/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "VXCBGN3KRH7ELMA6YJP9",
          secret: "C9FDAYQTHULJ6KMXEV8G",
          format: "json",
          q: address,
          post_box: "0",
          region_code: "1",
          census: "2018",
          domain: "",
          ascii: "1"
        })
      });

      const data = await response.json();
      if (data.success && data.matched) {
        setResult("✅ Address is valid!");
      } else {
        setResult("❌ Address not matched.");
      }
    } catch (error) {
      setResult("🚫 Error verifying address.");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!address.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch("https://1opzd82p8k.execute-api.ap-southeast-2.amazonaws.com/dev/autocomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: "VXCBGN3KRH7ELMA6YJP9",
            secret: "C9FDAYQTHULJ6KMXEV8G",
            q: address,
            format: "json",
            delivered: "",
            post_box: "",
            rural: "",
            strict: "",
            region_code: "",
            domain: "",
            max: "",
            highlight: "",
            ascii: ""
          })
        });

        const data = await response.json();
        if (data.completions) {
          setSuggestions(data.completions.map(c => c.a));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        setSuggestions([]);
      }
    }, 300); // debounce

    return () => clearTimeout(timeoutId);
  }, [address]);

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            NZ Address Verifier
          </h1>

          <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your NZ address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2"
          />

          {suggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 rounded-lg text-left max-h-48 overflow-y-auto mb-4">
                {suggestions.map((s, idx) => (
                    <li
                        key={idx}
                        onClick={() => {
                          setAddress(s);
                          setSuggestions([]);
                        }}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {s}
                    </li>
                ))}
              </ul>
          )}

          <button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium transition"
          >
            Verify Address
          </button>

          {result && (
              <div className="mt-6 text-gray-700 text-md">{result}</div>
          )}
        </div>
      </div>
  );
}
