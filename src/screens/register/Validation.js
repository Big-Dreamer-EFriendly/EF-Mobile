import * as Yup from 'yup';

export const Signup_Schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name cannot contain special characters or numbers')
    .min(5, 'Name must be at least 5 characters!')
    .max(20, 'Name must have a maximum of 50 characters!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one digit')
    .required('Required'),
  // address: Yup.string().required('Required'),
  member: Yup.number()
    .min(1, 'Family members must be at least 1')
    .required('Required'),
});
