import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginSchema, LoginSchema } from './schema';
import './style.scss';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchema) => {
        console.log(data);
    };

    return (
        <Box className="login-container">
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
                        label="Username"
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        variant="outlined"
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!isValid}
                    >
                        Login
                    </Button>
                </Box>

                <Box>
                    <Typography>
                        Don't have an account?{' '}
                        <Link to="/sign-up">Sign Up</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
