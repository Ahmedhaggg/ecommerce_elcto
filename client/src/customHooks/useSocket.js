import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import io from 'socket.io-client'

function useSocket(url) {
    const [socket, setSocket] = useState(null)
    let { token, userId } = useSelector(state => state.user);

    useEffect(() => {
        if (token) {
            const socketIo = io(url, { auth: { token } })

            socketIo.connect();
            socketIo.emit("newUser", { userId });

            setSocket(socketIo)

            function cleanup() {
                socketIo.disconnect()
            }
            return cleanup
        }
        // should only run once and not on every re-render,
        // so pass an empty array
    }, [])

    return socket
}

export default useSocket;