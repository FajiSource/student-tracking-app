import {
  StyleSheet, Text, View, TextInput, Button,
  SafeAreaView, TouchableNativeFeedback, Keyboard
} from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { useUser } from '../../hooks/useUser';

const Register = () => {
  const { register } = useUser();
  const router = useRouter();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher'); 
  const [image, setImage] = useState(null);

  const handleRegister = async () => {
    if (!fName || !lName || !username || !password || !role) {
      alert('All fields are required');
      return;
    }

    const success = await register({ fName, lName, username, password, role, image });

    if (success) {
      router.replace('/login');
    }
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={fName}
          onChangeText={setFName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lName}
          onChangeText={setLName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      
        <TextInput
          style={styles.input}
          placeholder="Role (admin/teacher/student)"
          value={role}
          onChangeText={setRole}
        />

        <Button title="Register" onPress={handleRegister} />

        <Link href="/login" style={styles.link}>
          Already have an account? Login
        </Link>
      </SafeAreaView>
    </TouchableNativeFeedback>
  );
};

export default Register;

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
