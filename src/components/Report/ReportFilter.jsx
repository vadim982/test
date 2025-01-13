import { Box, Button, MenuItem, Select, Stack, TextField,  InputLabel, FormControl} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import { tableStatuses } from "../../mocks/status";
import { format, isValid, parse } from 'date-fns'

const defaultLocalQueryParams = {
    startDate: null,
    endDate: null,
    documentName: null,
    status: null,
};


export const ReportFilter = ({ onApply }) => {
    const [searchParams] = useSearchParams();

    const [localQueryParams, setLocalQueryParams] = useState({...defaultLocalQueryParams});

    const isDisabledBtn = useMemo(() => {
        if (Object.entries(localQueryParams).reduce((acc, [_, value]) => acc || value), null) {}

        if (isEqual(localQueryParams, searchParams)) return true;

        // Может быть такое, что в параметрах ничего нет, а в локале у нас null везде
        return !Object.entries(localQueryParams).some((param) => !!param[1]);
    }, [localQueryParams, searchParams]);

    const handlerReset = () => {
        setLocalQueryParams({...defaultLocalQueryParams});
    };

    const handlerChangeParam = (name, value) => setLocalQueryParams((prevState) => ({ ...prevState, [name]: value }));

    const parameterProcessing = (param, type) => {
        if (!param) return null;

        if (type === 'date') {
            const date = parse(param, 'dd-MM-yyyy', new Date());
            console.log(param, isValid(date))
            return isValid(date) ? date : null;
        }

        return param;
    };

    const handlerChangeDate = (nameField, date) => {
        // console.log(isValid(date), date)
        handlerChangeParam(nameField, date)
    }

    useEffect(() => {
        setLocalQueryParams({
            startDate: localQueryParams.startDate || parameterProcessing(searchParams.get('startDate'), 'date') || null,
            endDate: localQueryParams.endDate || parameterProcessing(searchParams.get('endDate'), 'date') || null,
            documentName: localQueryParams.documentName || parameterProcessing(searchParams.get('documentName')) || null,
            status: localQueryParams.status || parameterProcessing(searchParams.get('status')) || null,
        });
    }, [searchParams])

    return  (
        <Stack gap='16px'>
            <Stack flexDirection='row' alignItems='center' gap='16px'>
                <TextField
                    value={localQueryParams.documentName || ''}
                    placeholder="Введите название документа"
                    label='Название документа' sx={{ width: '300px' }}
                    onChange={(e) => handlerChangeParam('documentName', e.target.value.trim())}
                />
                <Select
                    value={localQueryParams.status}
                    label="Статус"
                    sx={{ width: '300px' }}
                    onChange={(e) => handlerChangeParam('status', e.target.value)}
                >
                    {Object.keys(tableStatuses).map((code) => <MenuItem key={code} value={tableStatuses[code]}>{tableStatuses[code]}</MenuItem>)}
                </Select>
                <Stack flexDirection='row' alignItems='center' gap='8px'>
                    <DatePicker maxDate={localQueryParams.endDate  ?? undefined} format='dd-MM-yyyy' value={localQueryParams.startDate} label="Дата создания с" sx={{ width: '200px' }} onChange={(newData) => handlerChangeDate('startDate', newData)} />
                    <Box component='span'>&mdash;</Box>
                    <DatePicker format='dd-MM-yyyy' startDate={localQueryParams.startDate ?? undefined} value={localQueryParams.endDate} label="Дата создания по" sx={{ width: '200px' }} onChange={(newData) => handlerChangeDate('endDate', newData)} />
                </Stack>
            </Stack>
            <Stack gap='16px' flexDirection='row'>
                <Button variant='contained' disabled={isDisabledBtn} onClick={() => onApply({...localQueryParams, startDate: isValid(localQueryParams.startDate) ? format(localQueryParams.startDate, 'dd-MM-yyyy') : null, endDate: isValid(localQueryParams.endDate) ? format(localQueryParams.endDate, 'dd-MM-yyyy') : null})}>Применить</Button>
                <Button variant='outlined' onClick={handlerReset} disabled={isDisabledBtn}>Сбросить</Button>
            </Stack>
        </Stack>
    )
};