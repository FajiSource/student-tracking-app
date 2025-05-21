import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableNativeFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { useUser } from '../../hooks/useUser';

const Login = () => {
  const {user} = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    router.replace("/(tabs)");
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Login" onPress={handleLogin} />

        <Link href="/(auth)/register" style={styles.link}>Register </Link>

      </SafeAreaView>
    </TouchableNativeFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center'
  }
});
