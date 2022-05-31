import express from 'express';
import { cart,cartItems,removeCartItems,updateCartQuantity,checkout,placedOrders} from '../controllers/cart';
const router = express.Router();

router.post('/' ,cart);
router.post('/items' ,cartItems);
router.post('/remove',removeCartItems);
router.post('/update',updateCartQuantity);
router.post('/checkout',checkout);
router.post('/placedOrders',placedOrders);

export default router;