// src/user_interface/components/Header.js

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>P2P Chat Application</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#6200ee',
        borderRadius: 8,
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    },
});

export default Header;
