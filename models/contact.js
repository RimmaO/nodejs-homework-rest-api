const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Contact = model("contact", contactSchema);

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactsPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

const contactsPatchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactFilterFavoriteSchema = {
  favorite: Joi.number().valid(0, 1),
  // favorite: Joi.boolean(),
};

const schemas = {
  contactsAddSchema,
  contactsPutSchema,
  contactsPatchSchema,
  contactFilterFavoriteSchema,
};

module.exports = { Contact, schemas };
