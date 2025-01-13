import React, { useState } from 'react';
import { TextField, Stack, Typography, Button, FormHelperText } from '@mui/material';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { localStorageKeys } from '../constants/localStorageKeys';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';

    const [formData, setFormData] = useState({
        login: null,
        password: null,
    });

    const [isError, setIsError] = useState('');

    const handleClickLogin = () => {
        if (formData.login !== localStorage.getItem(localStorageKeys.login)) return setIsError(true);

        if (formData.password !== localStorage.getItem(localStorageKeys.password)) return setIsError(true);

        setIsError(false);
        localStorage.setItem(localStorageKeys.isLogin, true)
        navigate(from, { replace: true });
    };

    return <Stack sx={{
        height: '100vh',
    }} alignItems='center' justifyContent='center'>
        <Stack gap='16px' border='1px solid gray' borderRadius='16px' padding='16px' width='500px' justifyContent='center' alignItems='center'>
            <Typography variant='h2'>Авторизация</Typography>
            <TextField label='Логин' value={formData.login} onChange={(e) => setFormData((state) => ({ ...state, login: e.target.value }))} fullWidth />
            <TextField label='Пароль' value={formData.password} fullWidth onChange={(e) => setFormData((state) => ({ ...state, password: e.target.value }))} />
            {isError && <FormHelperText error={true}>Логин или пароль не совпадают</FormHelperText>}
            <Link to='/reset-password'><Button variant='text'>Сбросить пароль</Button></Link>
            <Button onClick={handleClickLogin}>Войти</Button>
        </Stack>
    </Stack>
};