'use client'
import React from 'react'
import {logout} from '../../../lib'
import { useRouter } from "next/navigation";
import styles from '../chat/chat.module.css'
const LogoutButton = () => {
    const router = useRouter()
  return (
    <>
    <button className = {styles.logoutButton} onClick={async() =>{
        await logout()
        router.push('/login')
    }}>logout</button>
    </>
  )
}

export default LogoutButton