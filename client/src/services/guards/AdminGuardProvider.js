import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminGuard from "./AdminGuard";
import PageLoading from "../../components/PageLoading";
 
export default function AdminGuardProvider({ children }) {
    let router = useRouter();
    let notProtectedPages = { login: "login", 404: "404" }
    let page = router.asPath.split("/").pop();
    let [ISSSR, setISSSR] = useState(false)
    let [showChild, setShowChild] = useState(false)
    
    useEffect(() => {
        setISSSR(true)
    }, []);

    useEffect(() => {
        setShowChild(true);
    }, []);
    
    if (!showChild) {
        return null;
    }
    
    if (typeof window === 'undefined') 
        return <></>;

    if (notProtectedPages[page] && !ISSSR)
        return <PageLoading />

    if (notProtectedPages[page] && ISSSR)
        return <div>{children}</div>
        
    return (
        <AdminGuard>{children}</AdminGuard>
    )

}