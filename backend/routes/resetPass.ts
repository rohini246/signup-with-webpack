import express from 'express';
import {resetPass} from '../controllers/resetPass';

const router = express.Router();

router.patch('/' ,resetPass);

export default router;