const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite, name } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };
  if (favorite !== undefined) {
    query.favorite = favorite;
  }

  if (name !== undefined) {
    query.name = name;
  }

  const allContacts = await Contact.find({ ...query }, "-updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  const count = allContacts.length;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: allContacts,
      page,
      limit,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const oneContact = await Contact.findOne({ _id: contactId, owner });
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
  const { _id: owner } = req.user;

  const deleteContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });
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
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

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
  const { _id: owner } = req.user;
  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
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
  const { _id: owner } = req.user;

  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
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
