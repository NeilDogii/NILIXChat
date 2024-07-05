'use client'
import React from 'react'
import { useEffect, useState } from 'react'
const ChatHistory = () => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch('/api/messages')
            const result = await response.json()
            setMessages(result)
        }
        fetchMessages()
    }, [])
  return (
    <>
        <ul>
            {messages.map((message, index) => (
            <li key={index}>{message.text}</li>
            ))}
        </ul>
    </>
  )
}

export default ChatHistory