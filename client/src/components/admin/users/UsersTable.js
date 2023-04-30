import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import CustomLinkButton from '../CustomLinkButton';

export default function UsersTable({ rows, page }) {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>number</TableCellStyle>
                        <TableCellStyle>userName</TableCellStyle>
                        <TableCellStyle>email</TableCellStyle>
                        <TableCellStyle align="center">show</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">{(( page - 1 ) * 10) + index + 1}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.firstName} {row.lastName}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.email}</TableCellStyle>
                            <TableCellStyle align="center">
                                <CustomLinkButton text="show" to={`users/${row._id}/orders`}/>
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
