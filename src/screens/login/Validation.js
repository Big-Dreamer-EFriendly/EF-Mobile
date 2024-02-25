import * as Yup from 'yup';

export const Login_Schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one digit')
    .required('Required')
  
});
