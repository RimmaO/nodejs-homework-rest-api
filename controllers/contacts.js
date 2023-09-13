const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: allContacts,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: oneContact,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(contactId);
  if (!deleteContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: deleteContact,
    },
  });
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: updateContact,
    },
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updateContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: updateContact,
    },
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};