import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import { env } from "../../../next.config"
import CustomLink from '../CustomLink';

export default function ProductsTable({ rows }) {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: { xs: "340px", sm: "100%" } }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>image</TableCellStyle>
                        <TableCellStyle>title</TableCellStyle>
                        <TableCellStyle>price</TableCellStyle>
                        <TableCellStyle align="center">category</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRowStyle key={row._id}>
                            <TableCellStyle component="th" scope="row">
                                <img
                                    src={`${env.IMAGE_URL}/${row.image}?w=164&h=164&fit=crop&auto=format`}
                                    alt={row.title}
                                    loading="lazy"
                                    width="40px"
                                    height="40px"
                                />
                            </TableCellStyle>
                            <TableCellStyle component="th" scope="row">
                                <CustomLink to={"products/" + row.slug} text={row.title}/>
                            </TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.price}</TableCellStyle>
                            <TableCellStyle component="th" scope="row" align="center">{row.category.title}</TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
