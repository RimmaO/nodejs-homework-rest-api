const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get(
  "/",
  authenticate,

  ctrl.listContacts
);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactsAddSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactsPutSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.contactsPatchSchema),
  ctrl.updateFavorite
);

module.exports = router;
