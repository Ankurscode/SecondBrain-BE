import z, { email } from "zod";

export const userValidation=z.object({
    username:z.string().min(3),
    userEmail:z.string().email(),
    password:z.string().min(4)
})

export const logInValidation=z.object({
    userEmail:z.string().email(),
    password:z.string().min(4)
})

export const forgotValidation=z.object({
    userEmail:z.string().email(),
})

export const verifyOtpValidation=z.object({
    useEmail:z.string().email("Invalid email address"),
    otp:z.string().length(6)
})

export const resetPasswordValidation=z.object({
    userEmail:z.string().email(),
    userOtp:z.string(),
    newPassword:z.string().min(4)
})