import express from 'express';
import { address,city,zip} from '../controllers/address';

const router = express.Router();

router.post('/',address);
router.post('/city',city);
router.post('/zip',zip);


export default router;