import Joi from "joi";

const createUserSchema = Joi.object({
    username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
    email: Joi.string()
              . required()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
                 .alphanum()
                 .required()
                 .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

export default createUserSchema;