'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const ChatHistory = () => {
    const [messages, setMessages] = useState(["hi"])
    useEffect(() => {
        const socket = io("http://localhost:4200")
        socket.on("message", msg =>{
            setMessages(e => [...e,msg] )
        })
        // const fetchMessages = async () => {
        //     const response = await fetch('/api/messages')
        //     const result = await response.json()
        //     setMessages(result)
        // }
        // fetchMessages()

    }, [])
  return (
    <>
    {
        messages.map((msg, index) => {
            return <div key={index}>{msg}</div>
        })
    }

    </>
  )
}

export default ChatHistory