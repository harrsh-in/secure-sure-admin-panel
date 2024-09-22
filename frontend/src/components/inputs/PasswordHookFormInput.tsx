import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { useState } from 'react';
import {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from 'react-hook-form';

const PasswordHookFormInput = <T extends FieldValues>({
    register,
    errors,
    name,
    disabled,
}: PasswordHookFormInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="outlined" fullWidth disabled={disabled}>
            <InputLabel htmlFor={name} error={!!errors[name]}>
                Password
            </InputLabel>

            <OutlinedInput
                id={name}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register(name)}
                error={!!errors[name]}
                endAdornment={
                    <InputAdornment
                        position="end"
                        disablePointerEvents={disabled}
                    >
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disabled={disabled}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />

            {errors[name] && (
                <FormHelperText error={!!errors[name]}>
                    {errors[name].message?.toString()}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default PasswordHookFormInput;

interface PasswordHookFormInputProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    name: Path<T>;
    disabled?: boolean;
}
