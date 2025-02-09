import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateSchema } from '../validation/validateSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateValidation } from '../validation/updateValidation.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', authMiddleware, ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  authMiddleware,
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  authMiddleware,
  validateBody(validateSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  authMiddleware,
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/:contactId',
  authMiddleware,
  isValidId,
  validateBody(updateValidation),
  ctrlWrapper(patchContactController),
);

export default router;
