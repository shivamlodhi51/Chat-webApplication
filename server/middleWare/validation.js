const z = require('zod');
const register = z.object({
    firstName:z
    .string({required_error:"firstName is required"})
    .trim()
    .min(3,{message: "firstName must be at least 3 characters"})
    .max(20,{message: "firstName must not be at more then 200 characters"}),
    lastName:z
    .string({required_error:"lastName is required"})
    .trim()
    .min(3,{message: "lastName must be at least 3 characters"})
    .max(20,{message: "lastName must not be at more then 200 characters"}),
    email:z
    .string({required_error:"email is required"})
    .trim()
    .min(5,{message: "email must be at least 7 characters"})
    .max(200,{message: "email must not be at more then 200 characters"}),
    password:z
    .string({required_error:"password is required"})
    .trim()
    .min(5,{message: "password must be at least 3 characters"})
    .max(20,{message: "password must not be at more then 20 characters"}),
})

module.exports = register;