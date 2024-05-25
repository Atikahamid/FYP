import * as Yup from 'yup'

const regexp =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const UserSignupValidation = Yup.object({
    fullName: Yup.string().min(3).required('Full name is required'),
    gender: Yup.string().required('gender is required'),
    email: Yup.string().email('Enter a valid email').required('email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
    .matches(
     regexp,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
    cpassword: Yup.string().oneOf([Yup.ref('password')], "Password does not match"),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    phoneNumber: Yup.string().min(11, 'phone number should contain 11 digits').max(11, 'phone number shoould contain 11 digits').required('Phone number is required'),
    streetName: Yup.string().required('address is required'),
    city: Yup.string().required('city is required'),
    postalCode: Yup.string().matches(/^\d{5}(?:[-\s]\d{4})?$/, 'Invalid postal code').required('postal code is required'),
    country: Yup.string().required('country is required'),
    
})