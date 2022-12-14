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

  validateParam: (schema, _id) => {
    return (req, res, next) => {
      console.log(req.params);

      const result = schema.validate({ param: req["params"][_id] });

      console.log(result);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }

        if (!req.value["params"]) {
          req.value["params"] = {};
        }

        req.value["params"][_id] = result.value.param;

        next();
      }
    };
  },

  validateBody: (schema) => {
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
      errorScoreStatus: Joi.string().required(),
      colorBlindType: Joi.string().required(),
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

    clientSchema: Joi.object().keys({
      date: Joi.string().required(),
      fullName: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      device: Joi.string().required(),
      testType: Joi.string().required(),
      totalErrorScore: Joi.number().required(),
      errorScoreStatus: Joi.string().required(),
      colorBlindType: Joi.string().required(),
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
      status: Joi.string().required(),
    }),

    roomSchema: Joi.object().keys({
      date: Joi.string().required(),
      roomName: Joi.string().required(),
      adminEmail: Joi.string().required(),
      maxTES: Joi.number().required(),
      roomInitial: Joi.string().required(),
      testType: Joi.string().required(),
      device: Joi.string().allow(""),
      code: Joi.array().items(
        Joi.object({
          _id: Joi.string().required(),
          key: Joi.string().required(),
        })
      ),
    }),

    idIndividualSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),

    idGroupSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),

    codeSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9A-Z]{7}$/)
        .required(),
    }),
  },
};
