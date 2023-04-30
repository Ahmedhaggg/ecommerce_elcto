import { wrapper } from "../../store/admin"
import AdminGuardProvider from "../../services/guards/AdminGuardProvider"
import { ThemeProvider } from '@mui/material/styles';
import AdminTheme from "../../thems/AdminTheme";

function AdminProvider({ children }) {
    return (
        <ThemeProvider theme={AdminTheme}>
            <AdminGuardProvider>
                {children}
            </AdminGuardProvider>
        </ThemeProvider> 
    )
}

export default wrapper.withRedux(AdminProvider)