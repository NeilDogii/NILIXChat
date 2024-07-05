import React from "react";
import styles from "./chat.module.css";

export default function Chat() {
  return (
    <main>
      <ChatHistory/>
      <div className = {styles.messageInteraction}>
      <input className = {styles.inputBox}></input>
      <button className = {styles.sendButton}>Send</button>  
      </div> 
    </main>
  );
}

