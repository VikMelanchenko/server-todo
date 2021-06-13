const Joi = require('joi');

const schemaAddTask = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  subtitle: Joi.string().min(5).max(30),
  deadline: Joi.date(),
  text: Joi.string().required(),
  token: Joi.string().optional(),
});

const schemaUpdateTask = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  subtitle: Joi.string().min(5).max(30),
  deadline: Joi.date(),
  text: Joi.string().required(),
  token: Joi.string().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    console.log(error.details[0].path);
    console.log(error.details[0].context);
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.addTask = (req, _res, next) => {
  return validate(schemaAddTask, req.body, next);
};

module.exports.updateTask = (req, _res, next) => {
  return validate(schemaUpdateTask, req.body, next);
};
