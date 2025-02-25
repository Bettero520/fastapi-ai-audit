import React, { useState } from "react";

export default function URLAnalyzer() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url) {
      alert("請輸入網址！");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://fastapi-ai-audit.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("分析失敗，請稍後再試！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">引流優勢健檢 - URL 分析</h1>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg w-80 mb-4"
        placeholder="請輸入網址..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "分析中..." : "開始分析"}
      </button>
      {result && (
        <div className="mt-4 p-4 bg-white shadow rounded-lg w-80">
          <h2 className="text-lg font-semibold">分析結果</h2>
          <p className="text-gray-700">網址: {result.url}</p>
          <p className="text-gray-700">分類: {result.category}</p>
        </div>
      )}
    </div>
  );
}

