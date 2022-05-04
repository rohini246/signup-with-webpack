import express from 'express';
import { userLogin } from '../controllers/login';
import {authenticateToken} from '../authenticateToken'
const router = express.Router();

router.post('/',authenticateToken ,userLogin);

module.exports=router;