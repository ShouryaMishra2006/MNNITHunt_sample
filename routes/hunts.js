import express from 'express';
import { yourHunts } from '../controllers/hunt.controller.js';

const router = express.Router();
router.get('/my-events', yourHunts);

export default router;
