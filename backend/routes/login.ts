import express from 'express';
import { userLogin,userLoginDetails} from '../controllers/login';


const router = express.Router();

router.post('/' ,userLogin);
router.post('/details' ,userLoginDetails);
export default router;