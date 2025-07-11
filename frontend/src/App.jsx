import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:4000/shorten";

function App() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [details, setDetails] = useState(null);
  const [newUrl, setNewUrl] = useState("");

  const createShortUrl = async () => {
    try {
      const res = await axios.post(API_URL, { url });
      setShortCode(res.data.shortCode);
      toast.success("Short URL created!");
    } catch (err) {
      toast.error("Failed to create short URL");
    }
  };

    const getDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/${shortCode}`);
      setDetails(res.data);
      toast.success("URL found!");
    } catch (err) {
      toast.error("Short URL not found!");
    }
  };

   const updateUrl = async () => {
    try {
      const res = await axios.put(`${API_URL}/${shortCode}`, { url: newUrl });
      setDetails(res.data);
      toast.success("URL updated!");
    } catch (err) {
      toast.error("Failed to update URL");
    }
  };

   const deleteUrl = async () => {
    try {
      await axios.delete(`${API_URL}/${shortCode}`);
      setDetails(null);
      toast.success("URL deleted!");
    } catch (err) {
      toast.error("Failed to delete URL");
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          🔗 URL Shortener
        </h1>

        {/* Create Short URL */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Enter Long URL</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/very/long/url"
            />
            <button
              onClick={createShortUrl}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Shorten
            </button>
          </div>
        </div>

        {/* Retrieve, Stats, Delete */}
        <div className="mb-6">
          <label className="block font-medium mb-2">Enter Short Code</label>
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="abc123"
            />
            <button
              onClick={getDetails}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Get URL
            </button>
            <button
              onClick={getStats}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Stats
            </button>
            <button
              onClick={deleteUrl}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Update Short URL */}
        <div className="mb-6">
          <label className="block font-medium mb-2">New URL to Update</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://new-example.com"
            />
            <button
              onClick={updateUrl}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </div>

        {/* Show URL Details */}
        {details && (
          <div className="bg-gray-50 p-5 border border-gray-200 rounded-lg mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">📄 URL Details</h2>
            <p><span className="font-medium">ID:</span> {details._id || details.id}</p>
            <p><span className="font-medium">Original URL:</span> {details.url}</p>
            <p><span className="font-medium">Short Code:</span> {details.shortCode}</p>
            <p><span className="font-medium">Created At:</span> {new Date(details.createdAt).toLocaleString()}</p>
            <p><span className="font-medium">Updated At:</span> {new Date(details.updatedAt).toLocaleString()}</p>
            <p><span className="font-medium">Access Count:</span> {details.accessCount ?? 0}</p>
          </div>
        )}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
