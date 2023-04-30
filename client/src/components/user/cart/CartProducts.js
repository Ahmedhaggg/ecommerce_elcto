import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import { env } from "../../../next.config"
import { useSelector } from 'react-redux';
import CartActions from './CartActions';
import DeleteCartItem from './DeleteCartItem';
import { Box } from '@mui/system';

export default function CartProducts() {
    let { items } = useSelector(state => state.cart);
    return (
        <TableContainer component={Paper} sx={{ maxWidth: { xs: "100%", sm: "100%" } }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRowStyle>
                        <TableCellStyle>image</TableCellStyle>
                        <TableCellStyle>title</TableCellStyle>
                        <TableCellStyle>price</TableCellStyle>
                        <TableCellStyle>quantity</TableCellStyle>
                        <TableCellStyle>totalPrice</TableCellStyle>
                        <TableCellStyle align="center">actions</TableCellStyle>
                        <TableCellStyle align='right'>delete</TableCellStyle>
                    </TableRowStyle>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
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
                            <TableCellStyle component="th" scope="row">{row.title}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.price}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.quantity}</TableCellStyle>
                            <TableCellStyle component="th" scope="row">{row.quantity * row.price}</TableCellStyle>
                            <TableCellStyle component="th" scope="row" align='center'>
                               <Box sx={{ display: "flex", justifyContent: "center" }}>
                                   <CartActions item={row} small={true} />
                               </Box>
                            </TableCellStyle>
                            <TableCellStyle align='right'>
                                <DeleteCartItem productId={row._id}/>
                            </TableCellStyle>
                        </TableRowStyle>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
