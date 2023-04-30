import { TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';


const RowStyled = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.white,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TableRowStyle({ children, background }) {
    return <RowStyled>{children}</RowStyled>
};