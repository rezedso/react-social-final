import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLogIn } from '../../lib/react-query/queries';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@emotion/react';
import { loginUserSchema } from '../../lib/zod/validations';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginUserSchema) });
  const navigate = useNavigate();
  const theme = useTheme();

  const { mutateAsync: login, isSuccess } = useLogIn();

  const onSubmit = async (data) => {
    login(data);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);
  return (
    <Container maxWidth='lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={350} sx={{ m: 'auto', p: 2 }}>
          <Typography variant='h5' textAlign='center'>
            Log In
          </Typography>
          <FormLabel>Email</FormLabel>
          <TextField
            {...register('email')}
            size='small'
            fullWidth
            variant='outlined'
          />
          {errors.email && (
            <Typography
              variant='subtitle2'
              sx={{ color: theme.palette.error.main }}
            >
              {errors.email.message}
            </Typography>
          )}
          <FormLabel>Password</FormLabel>
          <TextField
            {...register('password')}
            size='small'
            fullWidth
            type='password'
            variant='outlined'
          />
          {errors.password && (
            <Typography
              variant='subtitle2'
              sx={{ color: theme.palette.error.main }}
            >
              {errors.password.message}
            </Typography>
          )}
          <Button type='submit' variant='contained'>
            Log in
          </Button>
          <Stack direction='row' spacing={2}>
            <Typography variant='sub'>Not registered yet?</Typography>
            <Link to='/register' className='auth-form-link'>
              Register
            </Link>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default LoginPage;
