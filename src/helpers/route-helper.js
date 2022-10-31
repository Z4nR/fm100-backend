const Joi = require("joi");

module.exports = {
  generateRandomCharacters: (size) => {
    let generatedArray = [];
    for (let i = 0; i < 2; i++) {
      let generatedOutput = "";
      const storedCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const totalCharacterSize = storedCharacters.length;
      for (let index = 0; index < size; index++) {
        generatedOutput += storedCharacters.charAt(
          Math.floor(Math.random() * totalCharacterSize)
        );
      }
      generatedArray.push({ _id: [i] + 1, key: generatedOutput });
    }
    return generatedArray;
  },

  validateIndividualBody: (schema) => {
    return (req, res, next) => {
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
      fullName: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      device: Joi.string().required(),
      testType: Joi.string().required(),
      totalErrorScore: Joi.number().required(),
      comparisonResults: Joi.array().items(
        Joi.object({
          _id: Joi.string().required(),
          comparison: Joi.string().required(),
        })
      ),
      discriminantResults: Joi.array().items(
        Joi.object({
          _id: Joi.string().required(),
          discriminant: Joi.number().required(),
        })
      ),
    }),
  },
};
