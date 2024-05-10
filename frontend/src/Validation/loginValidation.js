import * as Yup from 'yup'



export const loginValidation = Yup.object({
   
    email: Yup.string().email('Enter a valid email').required('email is required'),
    password: Yup.string().required('Password is required'),
    
})