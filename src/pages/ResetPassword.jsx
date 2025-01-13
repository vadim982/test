import React, { useState } from 'react';
import { TextField, Stack, Typography, Button, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { localStorageKeys } from '../constants/localStorageKeys';

export const ResetPassword = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: null,
        newPassword: null,
    });

    const [error, setIsError] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = () => {
        if (formData.currentPassword !== localStorage.getItem(localStorageKeys.password)) return setIsError('Старый пароль введен неверно');

        if (formData.newPassword === localStorage.getItem(localStorageKeys.currentPassword)) return setIsError('Новый пароль совпадает со старым');

        setIsError('');
        setIsSuccess(true);
        localStorage.setItem(localStorageKeys.password, formData.newPassword)
    };

    return <Stack sx={{
        height: '100vh',
    }} alignItems='center' justifyContent='center'>
        <Stack gap='16px' border='1px solid gray' borderRadius='16px' padding='16px' width='500px' justifyContent='center' alignItems='center'>
            <Typography variant='h2'>Смена пароля</Typography>

            {!isSuccess && <>
                <TextField label='Старый пароль' value={formData.currentPassword} onChange={(e) => setFormData((state) => ({ ...state, currentPassword: e.target.value }))} fullWidth />
                <TextField label='Новый пароль' value={formData.newPassword} fullWidth onChange={(e) => setFormData((state) => ({ ...state, newPassword: e.target.value }))} />
                {error && <FormHelperText error={true}>{error}</FormHelperText>}
                <Button onClick={handleClick}>Сменить пароль</Button>
            </>}

            {
                isSuccess && <>
                    <Typography variant='h4' color='success'>пароль успешно изменен</Typography>
                    <Link to='/login'><Button variant='contained'>Перейти на страницу логина</Button></Link>
                </>
            }
        </Stack>
    </Stack>
};