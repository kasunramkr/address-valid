import './App.css';
import React, { useState } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");

  const handleVerify = () => {
    if (address.trim() === "") {
      setResult("⚠️ Please enter an address.");
    } else {
      setResult(`✅ Verifying: ${address}`);
    }
  };

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
          />

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