import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import PageLoading from "../../components/PageLoading";
import cookies from "../cookies";
import { adminTokenKey } from "../cookies/cookies_keys";

export default function AdminGuard({ children }) {
    let [isLoading, setIsLoading] = useState(true);
    let [isAdmin, setIsAdmin] = useState(false);

    let router = useRouter();

    useEffect(() => {
        if (!cookies.get(adminTokenKey)) {
            router.push("/admin/login")
        } else {
            // load content
            setIsAdmin(true)
            setIsLoading(false)
        }

    }, [])

    if (isLoading)
        return <PageLoading />;

    if (isAdmin)
        return (
            <AdminLayout>{children}</AdminLayout>
        )
}