import createHttpError from 'http-errors';
import {
  getContactById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contact.js';

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
    throw new createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${ObjectId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { ObjectId } = req.params;
  const contact = await deleteContact(ObjectId);
  if (!contact) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

// export const upsertContactController = async (req, res) => {
//   const { ObjectId } = req.params;
//   const result = await updateContact(ObjectId, req.body, { upsert: true });

//   if (!result) {
//     throw new createHttpError(404, 'Contact not found');
//   }
//   const status = result.isNew ? 201 : 200;
//   res.status(status).json({
//     status,
//     message: 'Successfully upserted a contact!',
//     data: result.contact,
//   });
// };

export const patchContactController = async (req, res, next) => {
  const { ObjectId } = req.params;
  const result = await updateContact(ObjectId, req.body);

  if (!result) {
    throw new createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
