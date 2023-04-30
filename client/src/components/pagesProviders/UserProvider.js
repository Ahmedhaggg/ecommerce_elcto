import { wrapper } from "../../store/user"
import { ThemeProvider } from '@mui/material/styles';
import UserTheme from "../../thems/userTheme";
import Layout from "../user/layout/Layout";
import { useRouter } from "next/router";

function UserProvider({ children }) {
    let router = useRouter();
    
    const pagesWithoutLayout = { 
        login: "login", 
        register: "register"
    }

    let page = router.asPath.split("/").pop();

    return (
        <ThemeProvider theme={UserTheme}>
            {pagesWithoutLayout[page] ? <div>{children}</div> : <Layout>{children}</Layout>}
        </ThemeProvider>
    )
}

export default wrapper.withRedux(UserProvider)