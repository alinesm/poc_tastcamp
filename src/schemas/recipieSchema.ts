import joi from "joi";

export const receitaSchema = joi.object({
  title: joi.string().required(),
  prepare: joi.string().required(),
  ingridients: joi.string().required(),
});
