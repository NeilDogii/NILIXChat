'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const ChatHistory = () => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const socket = io("http://localhost:4200")
        socket.on("message", (msg, author) =>{
            setMessages(e => [...e, author + ": " + msg] )
        })
        const fetchMessages = async () => {
            const response = await fetch('http://localhost:4201/api/messages?channelID=1')
            const result = await response.json()
            result.message.forEach(e=>{
                let m = e.author + ": " + e.message
                setMessages(e => [...e, m])
            })
            
            //setMessages(result)
        }
        fetchMessages()

        console.log(messages)

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