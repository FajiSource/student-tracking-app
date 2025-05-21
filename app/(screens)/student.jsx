import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Student = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const student = {
        name: 'Juan Dela Cruz',
        age: 18,
        studentId: '2023001',
        class: 'BS Computer Science',
        contact: {
            email: 'juan@example.com',
            phone: '+63 912 345 6789',
        },
        profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    };

    const handleEdit = () => {

        router.push('/(screens)/editStudent');
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Student',
            'Are you sure you want to delete this student?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {

                        console.log(`Deleted student ${student.studentId}`);
                        router.replace('/(screens)/students');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.container, { paddingTop: insets.top }]}>
                  

                    <Text style={styles.title}>Student Profile</Text>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: student.profileImage }} style={styles.profileImage} />
                    </View>

                    <View style={styles.card}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.value}>{student.name}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Age</Text>
                            <Text style={styles.value}>{student.age}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Student ID</Text>
                            <Text style={styles.value}>{student.studentId}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Class</Text>
                            <Text style={styles.value}>{student.class}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{student.contact.email}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Phone</Text>
                            <Text style={styles.value}>{student.contact.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
                            <Text style={styles.actionText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                            <Text style={styles.actionText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Student;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 24,
    },
    infoRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editBtn: {
        backgroundColor: '#ffc107',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    deleteBtn: {
        backgroundColor: '#dc3545',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
    },
    actionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#007bff',
    },

});
