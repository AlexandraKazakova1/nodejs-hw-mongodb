import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:ObjectId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:ObjectId', ctrlWrapper(deleteContactController));

router.put('/contacts/:ObjectId', ctrlWrapper(upsertContactController));

router.patch('/contacts/:ObjectId', ctrlWrapper(patchContactController));

export default router;
