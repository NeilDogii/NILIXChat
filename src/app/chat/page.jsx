import React from "react";
import styles from "./chat.module.css";
import ChatHistory from "../components/ChatHistory";
import SendButton from "../components/SendButton";

export default function Chat() {
  return (
    <main>
      <ChatHistory/>
      <div className = {styles.messageInteraction}>
      <SendButton/>  
      </div> 
    </main>
  );
}

