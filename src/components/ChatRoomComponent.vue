<template>
    <div class="chat-room-container">
      <div class="messages-container" ref="messagesContainer">
        <div class="messages-bottom">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.sender === userName ? 'sent-message' : 'received-message']"
          >
            <p class="sender">{{ message.sender }}:</p>
            <p class="text">{{ message.uid === meetingId ? message.text : message.translatedText }}</p>

          </div>
        </div>
      </div>
      <div class="input-container">
  <form class="message-input" @submit.prevent>
    <input v-model="messageText" type="text" placeholder="Send a message..." @keyup.enter="sendMessage" />
    <button type="button" class="icon-button" @click="sendMessage">
      <img src="../assets/send.svg" alt="send">
    </button>
  </form>
</div>

    </div>
  </template>
  
  <script>
  import { db } from "@/firebase";
  import firebase from "firebase/compat/app";
  import "firebase/compat/database";
  import { translateMessage } from "@/utils/translate";
  
  export default  {
    data() {
      return {
        messages: [],
        messageText: "",
        selectedLanguage: "",
        userName: "",
        meetingId: "",
        chatRef: null,
      };
    },
    async created() {
      console.log("ChatRoomComponent created");
        this.userName = this.$route.params.name;
        this.selectedLanguage = this.$route.params.language;
        this.meetingId = this.$route.params.meetingId;


        const chatRef = db.ref("chats").child(this.meetingId);

        chatRef
        // .child("messages")
            .orderByChild("timestamp")
            .on("value", async (snapshot) => {
            const messages = [];
            snapshot.forEach((childSnapshot) => {
                const message = childSnapshot.val();
                if (
                message.targetLanguage === this.selectedLanguage ||
                message.uid === this.meetingId
                ) {
                message.id = childSnapshot.key;
                messages.push(message);
                }
            });

            for (const message of messages) {
                if (!message.translatedText || message.translatedText === "") {
                  let message_tr = ''
                if (message.sender == this.userName) {
                  message_tr = await translateMessage(
                      message.text,
                        message.targetLanguage,
                      message.originalLanguage
                    
                  );
                } else {
                   message_tr = await translateMessage(
                    message.text,
                    // this.selectedLanguage
                  message.originalLanguage,
                    message.targetLanguage
                      
                );
                }
                message.text = message_tr
                // Guarda el texto traducido en Firebase Realtime Database
                // chatRef
                //     // .child("messages")
                //     .child(message.uid)
                //     .update({ translatedText: message.translatedText });
                }
            }

            this.messages = messages;
        });
    },
    
    methods: {
        async sendMessage() {
          console.log("sendMessage called");
            if (!this.messageText) return;

            const otherUserLanguage = this.selectedLanguage === "en" ? "es" : "en";

            const newMessage = {
                sender: this.userName,
                text: this.messageText,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                originalLanguage: this.selectedLanguage,
                targetLanguage: otherUserLanguage,
            };

            const newMessageRef = db.ref("chats").child(this.meetingId);
            newMessage.uid = newMessageRef.key;
            await newMessageRef.push(newMessage);

            this.messageText = "";
            },

    },
  };
  </script>
  



<style scoped>
.chat-room-container {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.messages-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
}

.received-message {
  align-self: flex-start;
}

.sent-message {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 10px;
}

.message {
  background-color: #F5F5F5;
  border-radius: 3px;
  padding: 5px 10px;
  margin-bottom: 5px;
}

.sent-message .message {
  background-color: #CEE3FF;
}

.sender {
  font-weight: bold;
  font-size: 12px;
}

.text {
  font-size: 16px;
}

.sent-message .text {
  text-align: right;
}

.input-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  background-color: white;
  padding: 10px 20px;
}

.input-container input {
    font-size: 18px;
}

.message-input {
  display: flex;
  background-color: white;
  border: 1px solid #1A73E8;
  border-radius: 3px;
}

.message-input input {
  flex: 1;
  border: none;
  padding: 16px;
  outline: none;
}

.message-input input:focus {
  border-color: #1A73E8;
}

.icon-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 16px;
}
</style>
  