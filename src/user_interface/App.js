// src/user_interface/App.js

import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

export default function App() {
    const [messages, setMessages] = React.useState([]);

    const sendMessage = (message) => {
        setMessages([...messages, { content: message, type: 'sent' }]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <MessageList messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
});
