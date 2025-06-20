import joi, { ObjectSchema} from "joi";

export const registerUserSchema: ObjectSchema = joi.object().keys({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};:\'",.<>/?]).+$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
        }),
});

export const loginUserSchema: ObjectSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});