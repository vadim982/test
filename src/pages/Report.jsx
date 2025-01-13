import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReportFilter } from '../components/Report/ReportFilter';
import { ReportTable } from '../components/Report/ReportTable';
import { Box, Typography } from '@mui/material';
import { tableData } from '../mocks/table';

export function Report() {
  const [_, setSearchParams] = useSearchParams();

  const handlerApply = (newQueryParams) => {
    const filterQuery = Object.entries(newQueryParams).filter(([_, value]) => value);
    setSearchParams(Object.fromEntries(filterQuery));
  }

  return (
    <Box>
      <Typography variant='h3' paddingBottom='8px'>Фильтры</Typography>
      <ReportFilter onApply={handlerApply} />
      <Typography paddingTop='16px' variant='h3'>Данные</Typography>
      <Typography paddingBottom='8px' variant='caption' color='info'>В тз не было указано, чтобы по параметрам производился поиск</Typography>
      <ReportTable tableData={tableData} />
    </Box>
  );
}

