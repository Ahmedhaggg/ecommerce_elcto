import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import CustomLink from '../CustomLink';



export default function CategoriesTable({ rows }) {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>title</TableCellStyle>
                        <TableCellStyle align="right">show</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">
                                {row.title}
                            </TableCellStyle>
                            <TableCellStyle align="right">
                                <CustomLink text="show" to={`categories/${row.slug}`} />
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
