'use client'
import React, { useEffect, useState } from 'react'
 import styles from '../chat/chat.module.css'
 import io from 'socket.io-client'

const SendButton = () => {
    let [msg, setMsg] = useState('None')  
    let [socket, setSocket] = useState(undefined)
    function sendMessage() {
        if(socket != undefined) {
        socket.emit('message', msg)
        }
    }
    function handleChange(event) {
        setMsg(event.target.value)
    }
    useEffect(() => {
        const skt = io("http://localhost:4200/")
        setSocket(skt)
},[])
    
  return (
    <>
    <div className = {styles.msgButton}>
    <input className = {styles.inputBox} onChange={handleChange}></input>
    <button className = {styles.sendButton} onClick={sendMessage}>Send</button>
    </div>
    </>
  )
}

export default SendButton