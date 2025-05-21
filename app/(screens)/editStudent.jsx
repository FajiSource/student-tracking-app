import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';

const EditStudent = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const [form, setForm] = useState({
        name: 'Juan Dela Cruz',
        age: '18',
        studentId: '2023001',
        email: 'juan@example.com',
        phone: '+63 912 345 6789',
    });

    const [profileImage, setProfileImage] = useState(null);

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        Alert.alert('Success', 'Student information updated.');
        router.replace('/(screens)/students');
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
                        { label: 'Name', key: 'name' },
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
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        color: '#007bff',
        fontSize: 16,
        fontWeight: '600',
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
