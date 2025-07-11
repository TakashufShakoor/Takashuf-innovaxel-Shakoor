import express from 'express'
import { createShortURL, deleteShortURL, getOriginalURL, getURLStats, updateShortURL } from '../controllers/urlController.js';


const urlRouter = express.Router()

urlRouter.post("/", createShortURL);
urlRouter.get("/:shortCode", getOriginalURL);
urlRouter.put("/:shortCode", updateShortURL);
urlRouter.delete("/:shortCode", deleteShortURL);
urlRouter.get("/stats/:shortCode", getURLStats);


export default urlRouter
