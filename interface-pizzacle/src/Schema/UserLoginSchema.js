import * as yup from 'yup'

export const userLoginSchema = yup.object({
     email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});