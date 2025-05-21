import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Notif = ({ success, message }) => {
  return (
    <View style={[styles.container, success ? styles.success : styles.error]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Notif;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#155724',
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#721c24',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
