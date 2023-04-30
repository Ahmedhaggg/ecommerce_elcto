import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRowStyle from '../table/TableRowStyle';
import TableCellStyle from '../table/TableCellStyle';
import CustomLink from "../CustomLink"

export default function OrdersTable({ orders }) {

    return (
        <div>
            <TableContainer component={Paper} sx={{ maxWidth: { xs: "100%", sm: "100%"  } }}>
                <Table>
                    <TableHead>
                        <TableRowStyle>
                            <TableCellStyle>id</TableCellStyle>
                            <TableCellStyle>totalPrice</TableCellStyle>
                            <TableCellStyle>status</TableCellStyle>
                            <TableCellStyle>createdAt</TableCellStyle>
                            <TableCellStyle align="center">show</TableCellStyle>
                        </TableRowStyle>
                    </TableHead>
                    <TableBody>
                        {orders.map((row, index) => (
                            <TableRowStyle key={row._id}>
                                <TableCellStyle component="th" scope="row">{index + 1}</TableCellStyle>
                                <TableCellStyle component="th" scope="row">{row.amount}</TableCellStyle>
                                <TableCellStyle component="th" scope="row">{row.status}</TableCellStyle>
                                <TableCellStyle component="th" scope="row">{new Date(row.createdAt).toLocaleDateString("en-US")}</TableCellStyle>
                                <TableCellStyle component="th" scope="row" align="center">
                                    <CustomLink text="show" to={`/orders/${row._id}`} />
                                </TableCellStyle>
                            </TableRowStyle>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
