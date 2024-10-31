// src/user_interface/components/MessageInput.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MessageInput = ({ sendMessage }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={input}
                onChangeText={setInput}
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export
