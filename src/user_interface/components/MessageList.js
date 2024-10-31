// src/user_interface/components/MessageList.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MessageList = ({ messages }) => {
    return (
        <FlatList
            data={messages}
            renderItem={({ item }) => (
                <View style={[styles.message, item.type === 'sent' ? styles.sent : styles.received]}>
                    <Text>{item.content}</Text>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    message: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        maxWidth: '80%',
    },
    sent: {
        backgroundColor: '#d1e7dd',
        alignSelf: 'flex-end',
    },
    received: {
        backgroundColor: '#f8d7da',
        alignSelf: 'flex-start',
    },
});

export default MessageList;
