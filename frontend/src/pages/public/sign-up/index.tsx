import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpSchema } from './schema';
import './style.scss';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = (data: SignUpSchema) => {
        console.log(data);
    };

    return (
        <Box className="sign-up-container">
            <Typography component="h1" className="sign-up-header">
                Sign Up
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
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
