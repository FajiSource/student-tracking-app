import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
    ScrollView,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const EditStudent = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const params = useLocalSearchParams();

    const [form, setForm] = useState({
        fName: '',
        nName: '',
        lName: '',
        age: '',
        studentId: '',
        email: '',
        phone: '',
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);


    useEffect(() => {
        setForm({
            fName: params.fName || '',
            nName: params.nName || '',
            lName: params.lName || '',
            age: params.age?.toString() || '',
            studentId: params.studentId || '',
            email: params.email || '',
            phone: params.phone || '',
        });

        if (params.image && params.image !== 'null') {
            setProfileImage(`http://192.168.1.9:8000/storage/${params.image}`);
        }
    }, []);

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: [ImagePicker.MediaType.Images],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });


        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            setImageFile(result.assets[0]);
        }
    };


    const handleSave = async () => {
        try {
            let formData = new FormData();

            formData.append('student_id', form.studentId);
            formData.append('fName', form.fName);
            formData.append('mName', form.nName);
            formData.append('lName', form.lName);
            formData.append('age', form.age);
            formData.append('email', form.email);
            formData.append('phone', form.phone);

            if (imageFile) {
                const uriParts = imageFile.uri.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formData.append('image', {
                    uri: imageFile.uri,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            }

            const response = await axios.post(
                'http://192.168.1.9:8000/api/students/update',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            Alert.alert('Success', 'Student information updated.');
            router.replace({
                pathname: `/(screens)/students`,
                params: {
                    courseId: params.courseId,
                    levelId: params.levelId,
                    blockId: params.blockId,
                },
            });

        } catch (error) {
            console.log(error.response?.data || error.message);
            Alert.alert('Error', error.response?.data?.error || 'Failed to update student');
        }
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={[styles.container, { paddingTop: insets.top }]}>
                    <Text style={styles.title}>Edit Student</Text>

                    <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.placeholder}>
                                <Ionicons name="camera-outline" size={40} color="#888" />
                                <Text style={styles.placeholderText}>Add Photo</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {[
                        { label: 'First Name', key: 'fName' },
                        { label: 'Middle Name', key: 'nName' },
                        { label: 'Last Name', key: 'lName' },
                        { label: 'Age', key: 'age', keyboardType: 'numeric' },
                        { label: 'Student ID', key: 'studentId' },
                        { label: 'Email', key: 'email', keyboardType: 'email-address' },
                        { label: 'Phone', key: 'phone', keyboardType: 'phone-pad' },
                    ].map(({ label, key, keyboardType }) => (
                        <View style={styles.inputGroup} key={key}>
                            <Text style={styles.label}>{label}</Text>
                            <TextInput
                                style={styles.input}
                                value={form[key]}
                                onChangeText={(text) => handleChange(key, text)}
                                keyboardType={keyboardType || 'default'}
                            />
                        </View>
                    ))}

                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Text style={styles.saveText}>Save Changes</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default EditStudent;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    saveBtn: {
        backgroundColor: '#28a745',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 24,
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
