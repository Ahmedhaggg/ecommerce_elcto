import { useRouter } from "next/router"
import '../styles/globals.css'
import AdminProvider from "../components/pagesProviders/AdminProvider"
import UserProvider from "../components/pagesProviders/UserProvider"

function MyApp({ Component, pageProps }) {
  let router = useRouter()
  let visitor = router.asPath.split("/")[1]
  // return (
  //   <div suppressHydrationWarning>
  //     <AdminProvider><Component {...pageProps} /></AdminProvider>
  //   </div>
  // )

  // return (
  //   <AdminProvider>
  //     <Component {...pageProps} />
  //   </AdminProvider>
  // )
  if (visitor === "admin")  
    return <div suppressHydrationWarning>
      <AdminProvider><Component {...pageProps} /></AdminProvider>
    </div>
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
export default MyApp;

// export default MyApp
