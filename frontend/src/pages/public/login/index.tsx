import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import PasswordHookFormInput from '../../../components/inputs/PasswordHookFormInput';
import axiosClient from '../../../utils/axiosClient';
import { loginSchema, LoginSchema } from './schema';
import './style.scss';

const Login = () => {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationKey: ['adminLogin'],
        mutationFn: loginApi,
        onSuccess() {
            navigate('/');
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchema) => {
        mutate(data);
    };

    return (
        <Paper className="login-container" variant="outlined">
            <Typography component="h1" className="login-header">
                Login
            </Typography>

            <Box className="form-container">
                <Box
                    noValidate
                    component="form"
                    autoComplete="off"
                    className="login-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label="Email"
                        {...register('email')}
                        autoFocus
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        variant="outlined"
                        disabled={isPending}
                    />

                    <PasswordHookFormInput
                        register={register}
                        errors={errors}
                        name="password"
                        disabled={isPending}
                    />

                    <Button
                        type="submit"
                        variant="outlined"
                        disabled={isPending}
                        color={Object.keys(errors).length ? 'error' : 'primary'}
                    >
                        {isPending ? 'Loading...' : 'Login'}
                    </Button>
                </Box>

                <Box>
                    <Typography>
                        Don't have an account?{' '}
                        <Link to="/sign-up">Sign Up</Link>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default Login;

const loginApi = async (data: LoginSchema) => {
    return await axiosClient.post('/auth/login/admin', data, {
        withCredentials: true,
    });
};
