import * as Yup from 'yup'

const regexp =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const resetPasswordValidation = Yup.object({
    password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(
     regexp,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
    cpassword: Yup.string().oneOf([Yup.ref('password')], "Password does not match")
})