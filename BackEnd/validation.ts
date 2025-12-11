import z from "zod";

export const userValidation=z.object({
    username:z.string().min(3),
    password:z.string().max(8).min(4)
})


