import * as Yup from 'yup';

export const Signup_Schema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'name must be at least 5 characters!')
    .max(12, 'name must have a maximum of 20 characters!')
    .required('Required'),
  email: Yup.string()
    .min(10, 'email must be at least 10 characters!')
    .required('Required'),
  phone: Yup.string()
    .min(10, 'phone must be at least 10 characters!')
    .max(10, 'phone must have a maximum of 10 characters!')
    .required('Required'),
  password: Yup.string()
    .min(5, 'address must be at least 5 characters!')
    .max(20, 'address must have a maximum of 20 characters!')
    .required('Required'),
});