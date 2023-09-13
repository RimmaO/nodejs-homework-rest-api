const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    const error = new Error(`${contactId} is not valid`);
    error.status = 400;
    throw error;
  }
  next();
};

module.exports = isValidId;
