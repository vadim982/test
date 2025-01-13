import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function ReportTable({ tableData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Дата создания</TableCell>
            <TableCell align="right">Автор</TableCell>
            <TableCell align="right">Примечание</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row.documentName}
            >
              <TableCell component="th" scope="row">
                {row.documentName}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.createDate}</TableCell>
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right">{row.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}