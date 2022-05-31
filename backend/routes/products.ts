import express from 'express';
import {products,productDetails } from '../controllers/products';

const router = express.Router();

router.post('/',products);
router.post('/details',productDetails);
// router.get('/colorAndSize',getColorAndSize)

export default router;