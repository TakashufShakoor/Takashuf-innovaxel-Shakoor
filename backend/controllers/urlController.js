import { nanoid } from 'nanoid';
import urlModel from '../models/urlModel.js';

// Create
const createShortURL = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  const newUrl = await urlModel.create({ url, shortCode });
  res.status(201).json(newUrl);
};



// Retrieve
const getOriginalURL = async (req, res) => {
  const url = await urlModel.findOne({ shortCode: req.params.shortCode });
  if (!url) return res.status(404).json({ error: "Not found" });

  url.accessCount += 1;
  await url.save();
  res.json(url);
};


// Update
const updateShortURL = async (req, res) => {
  const { url } = req.body;
  const updatedUrl = await urlModel.findOneAndUpdate(
    { shortCode: req.params.shortCode },
    { url, updatedAt: Date.now() },
    { new: true }
  );

  if (!updatedUrl) return res.status(404).json({ error: "Not found" });
  res.json(updatedUrl);
};


// Delete
const deleteShortURL = async (req, res) => {
  const deleted = await urlModel.findOneAndDelete({ shortCode: req.params.shortCode });
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.sendStatus(204);
};


// Stats
const getURLStats = async (req, res) => {
  const url = await urlModel.findOne({ shortCode: req.params.shortCode });
  if (!url) return res.status(404).json({ error: "Not found" });
  res.json(url);
};


export{createShortURL,getOriginalURL,updateShortURL,deleteShortURL,getURLStats}