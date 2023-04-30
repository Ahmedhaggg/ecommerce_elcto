import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PageLoading from '../PageLoading';
import { useRouter } from 'next/router';

export default function ProtectedUserPage(Component) {
    const AuthComponent = (props) => {
        let [isLogin, setIsLogin] = useState(false)
        let user = useSelector(state => state.user);
        let router = useRouter();

        useEffect(() => {
            if (!user.token)
                router.push("/login")
            else 
                setIsLogin(true)        
        }, []);

        return  isLogin ? <Component {...props} /> : <PageLoading />;
    }

    return AuthComponent;
}
