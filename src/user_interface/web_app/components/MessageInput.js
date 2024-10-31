// src/user_interface/web_app/components/MessageInput.js

export const MessageInput = (sendMessage) => `
    <div>
        <input type="text" id="messageInput" placeholder="Type a message..." />
        <button id="sendButton">Send</button>
    </div>
`;

// Add event listener for the send button
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');

    if (sendButton) {
        sendButton.addEventListener('click', () => {
            const message = messageInput.value;
            if (message.trim()) {
                sendMessage(message);
                messageInput.value = ''; // Clear the input field
            }
        });
    }
});
