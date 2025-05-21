import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AddStudent = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [studentId, setStudentId] = useState('');
    const [className, setClassName] = useState('');
    const [contact, setContact] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [email, setEmail] = useState('');


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Please allow photo access.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (!name || !age || !studentId || !className || !contact) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        const newStudent = {
            name,
            age,
            studentId,
            className,
            contact,
            email,
            profileImage: imageUri,
        };

        console.log('Saved student:', newStudent);
        Alert.alert('Success', 'Student added successfully!');
        router.replace('/(screens)/students');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top }]}>

                    {/* <Text style={styles.title}>Add Student</Text> */}

                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        ) : (
                            <Text style={styles.imagePlaceholder}>+ Upload Profile Image</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter full name"
                    />

                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={setAge}
                        placeholder="Enter age"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Student ID</Text>
                    <TextInput
                        style={styles.input}
                        value={studentId}
                        onChangeText={setStudentId}
                        placeholder="Enter student ID"
                    />

                    <Text style={styles.label}>Class / Year Level</Text>
                    <TextInput
                        style={styles.input}
                        value={className}
                        onChangeText={setClassName}
                        placeholder="e.g. 1st Year / Grade 10"
                    />

                    <Text style={styles.label}>Contact Info</Text>
                    <TextInput
                        style={styles.input}
                        value={contact}
                        onChangeText={setContact}
                        placeholder="Enter contact number or email"
                        keyboardType="email-address"
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Student</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default AddStudent;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        color: '#007bff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: '#555',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 16,
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: '#eee',
        alignSelf: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    imagePlaceholder: {
        color: '#555',
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    saveButton: {
        backgroundColor: '#28a745',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
