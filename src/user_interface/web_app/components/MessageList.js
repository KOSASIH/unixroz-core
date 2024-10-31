// src/user_interface/web_app/components/MessageList.js

export const MessageList = (messages) => {
    return `
        <div>
            ${messages.map(msg => `
                <div class="message ${msg.type}">
                    ${msg.content}
                </div>
            `).join('')}
        </div>
    `;
};
