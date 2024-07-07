import React from "react";
import styles from "./chat.module.css";
import ChatHistory from "../components/ChatHistory";
import SendButton from "../components/SendButton";
import {getSession} from '../../../lib'
import { redirect } from "next/navigation";

export default function Chat() {
  const session = getSession();

  if (!session) {
    return redirect("/login");
  }
  return (
    <main>
      <ChatHistory/>
      <div className = {styles.messageInteraction}>
      <SendButton/>  
      </div> 
    </main>
  );
}

