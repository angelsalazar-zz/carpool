const joi = require('joi');

module.exports = joi.object().keys({
    email : joi.string().alphanum().required(),
    firstname : joi.string().alphanum().required(),
    lastname : joi.string().alphanum().required()
}).required();