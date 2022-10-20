const Joi = require("joi");

module.exports = {
  generateRandomCharacters: (size) => {
    let generatedOutput = "";
    const storedCharacters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const totalCharacterSize = storedCharacters.length;
    for (let index = 0; index < size; index++) {
      generatedOutput += storedCharacters.charAt(
        Math.floor(Math.random() * totalCharacterSize)
      );
    }
    return generatedOutput;
  },

  validateIndividualBody: (schema) => {
    return (req, res, next) => {
      console.log(req.body);

      const result = schema.validate(req.body);

      console.log(result);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }

        if (!req.value["body"]) {
          req.value["body"] = {};
        }

        req.value["body"] = result.value;
        next();
      }
    };
  },

  schema: {
    individualSchema: Joi.object().keys({
      date: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      device: Joi.string().required(),
      testType: Joi.string().required(),
      totalErrorScore: Joi.number().required(),
      comparisonResults: Joi.array().items(
        Joi.object({
          number: Joi.number().required(),
          comparison: Joi.boolean().required(),
        })
      ),
      discriminantResults: Joi.array().items(
        Joi.object({
          number: Joi.number().required(),
          discriminant: Joi.number().required(),
        })
      ),
    }),
  },
};
