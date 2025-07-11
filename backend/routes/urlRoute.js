import express from 'express'
import { createShortURL, deleteShortURL, getOriginalURL, getURLStats, updateShortURL } from '../controllers/urlController.js';


const urlRouter = express.Router()

router.post("/", createShortURL);
router.get("/:shortCode", getOriginalURL);
router.put("/:shortCode", updateShortURL);
router.delete("/:shortCode", deleteShortURL);
router.get("/stats/:shortCode", getURLStats);


export default urlRouter
