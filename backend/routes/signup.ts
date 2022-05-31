import express from 'express';
import { createUser } from '../controllers/signup';

const router = express.Router();
router.post('/',createUser);

export default router;

