import createHttpError from 'http-errors';

import { getContactById, getAllContacts } from './contacts';

export const getContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { ObjectId } = req.params;
  const contact = await getContactById(ObjectId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${ObjectId}!`,
    data: contact,
  });
};
