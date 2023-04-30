import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let UserTheme = createTheme({

    // palette: {
    //     colors: {
    //         secondary: "#42a5f5",
    //         primary: "#0d47a1",
    //         danger: "#b71c1c",
    //         white: "#ebeff2",
    //         black: "#252525"
    //     }
    // },
    // fontSizes: {
    //     large: "40px",
    //     meduim: "30px",
    //     regular: "21px",
    //     small: "15px"
    // },
    // fontWeights: {
    //     bold: 700,
    //     meduim: 500,
    //     small: 400
    // },
    typography: {
        fontSizes: {
            large: "40px",
            meduim: "30px",
            regular: "21px",
            small: "15px"
        }
    }
});
UserTheme = responsiveFontSizes(UserTheme)
export default UserTheme;