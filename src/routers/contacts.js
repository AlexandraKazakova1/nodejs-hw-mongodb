import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:ObjectId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:ObjectId', ctrlWrapper(deleteContactController));

// router.put('/contacts/:ObjectId', ctrlWrapper(upsertContactController));

router.patch('/contacts/:ObjectId', ctrlWrapper(patchContactController));

export default router;
