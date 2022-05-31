import express from 'express';
import { forgot,tokenValidation} from '../controllers/forgot';

const router = express.Router();

router.post('/',forgot);
router.post('/:token',tokenValidation);

export default router;