import express from 'express';
import { createUser, updateUser } from '../controllers/signup';

const router = express.Router();
router.post('/',createUser);
router.post('/updateDetails',updateUser);

 export default router;

