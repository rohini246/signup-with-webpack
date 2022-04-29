import express from 'express';
import { userLogin } from '../controllers/login';

const router = express.Router();

router.post('/',userLogin);

module.exports=router;