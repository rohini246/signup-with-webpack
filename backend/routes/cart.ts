import express from 'express';
import { cart,cartItems,removeCartItems,updateCartQuantity,checkout,placedOrders,address} from '../controllers/cart';
const router = express.Router();

router.post('/' ,cart);
router.post('/items' ,cartItems);
router.post('/remove',removeCartItems);
router.post('/update',updateCartQuantity);
router.post('/checkout',checkout);
router.post('/placedOrders',placedOrders);
router.post('/address',address);

export default router;