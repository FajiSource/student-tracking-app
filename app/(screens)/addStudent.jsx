import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
   
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

const AddStudent = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { courseId, levelId, blockId } = useLocalSearchParams();
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [mName, setMName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [imageUri, setImageUri] = useState(null);

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

    const handleSave = async () => {
        if (!fName || !lName || !age || !phone || !levelId || !blockId || !courseId) {
            Alert.alert('Validation Error', 'Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('fName', fName);
        formData.append('lName', lName);
        formData.append('mName', mName);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('birthdate', birthdate.toISOString().split('T')[0]);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('level_id', levelId);
        formData.append('block_id', blockId);
        formData.append('course_id', courseId);

        if (imageUri) {
            formData.append('image', {
                uri: imageUri,
                name: 'profile.jpg',
                type: 'image/jpeg',
            });
        }

        try {
            const res = await axios.post(
                'http://192.168.1.9:8000/api/add-student',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            Alert.alert('Success', 'Student added successfully!');
            router.replace({
                    pathname:`/(screens)/students`,
                    params: {
                        courseId: courseId,
                        levelId: levelId,
                        blockId: blockId,
                    },
                });
        } catch (err) {
            console.error(err.response?.data || err);
            Alert.alert('Error', 'Failed to add student.');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top }]}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        ) : (
                            <Text style={styles.imagePlaceholder}>+ Upload Profile Image</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.label}>First Name</Text>
                    <TextInput style={styles.input} value={fName} onChangeText={setFName} />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.input} value={lName} onChangeText={setLName} />

                    <Text style={styles.label}>Middle Name</Text>
                    <TextInput style={styles.input} value={mName} onChangeText={setMName} />

                    <Text style={styles.label}>Age</Text>
                    <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />

                    <Text style={styles.label}>Gender</Text>
                    <TextInput style={styles.input} value={gender} onChangeText={setGender} />

                    <Text style={styles.label}>Birthdate</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                        <Text>{birthdate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={birthdate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setBirthdate(selectedDate);
                            }}
                        />
                    )}

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />

                    <Text style={styles.label}>Phone</Text>
                    <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

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
