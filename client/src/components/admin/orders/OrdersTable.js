import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import CustomLinkButton from '../CustomLinkButton';


export default function ordersTable({ rows, page }) {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>number</TableCellStyle>
                        <TableCellStyle>amount</TableCellStyle>
                        <TableCellStyle>status</TableCellStyle>
                        <TableCellStyle>location</TableCellStyle>
                        <TableCellStyle align="center">show</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">{((page - 1) * 10) + index + 1}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.amount}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.status}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.location}</TableCellStyle>
                            <TableCellStyle align="center">
                                <CustomLinkButton to={`/admin/orders/${row._id}`} text="show" />
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
