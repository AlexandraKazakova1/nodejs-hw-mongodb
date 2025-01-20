import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
} from '../controllers/contacts';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:ObjectIdId', ctrlWrapper(getContactByIdController));

export default router;
