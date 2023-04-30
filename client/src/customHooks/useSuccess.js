import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function useSuccess(isSuccess, pushUrl = null, excuteFn = null) {
    let router = useRouter();
    let [showMessage, setShowMessage] = useState(false);

    let timeout;

    useEffect(() => {
        if (isSuccess) {
            setShowMessage(true);
            timeout = setTimeout(() => {
                setShowMessage(false)
                
                if (pushUrl)
                    router.push(pushUrl)

                // if (excuteFn)
                //     excuteFn();
            }, 3000)
        }
        return () => {
            clearTimeout(timeout)
            if (isSuccess && excuteFn)
                excuteFn()
        }
    }, [isSuccess])

    return showMessage;
}
