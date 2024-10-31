// src/user_interface/web_app/app.js

import { Header } from './components/Header.js';
import { MessageList } from './components/MessageList.js';
import { MessageInput } from './components/MessageInput.js';

class App {
    constructor() {
        this.messages = [];
        this.init();
    }

    init() {
        document.getElementById('app').innerHTML = `
            <div>
                ${Header()}
                ${MessageList(this.messages)}
                ${MessageInput(this.sendMessage.bind(this))}
            </div>
        `;
    }

    sendMessage(message) {
        this.messages.push({ content: message, type: 'sent' });
        this.updateUI();
    }

    updateUI() {
        document.getElementById('app').innerHTML = `
            <div>
                ${Header()}
                ${MessageList(this.messages)}
                ${MessageInput(this.sendMessage.bind(this))}
            </div>
        `;
    }
}

new App();
