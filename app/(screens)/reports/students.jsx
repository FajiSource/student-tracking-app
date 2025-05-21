import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Platform,
    Modal,
    TextInput,
    Pressable,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const sampleStudents = [
    {
        id: '1',
        name: 'Juan Dela Cruz',
        yearLevel: '1st Year',
        studentId: '2023001',
        profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
        id: '2',
        name: 'Maria Santos',
        yearLevel: '2nd Year',
        studentId: '2023002',
        profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
        id: '3',
        name: 'Pedro Ramirez',
        yearLevel: '3rd Year',
        studentId: '2023003',
        profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
];

const Students = () => {
    const insets = useSafeAreaInsets();
     const router = useRouter();
    const renderStudent = ({ item }) => {
        return (
            <Pressable style={[styles.card]}
                onPress={() => {
                      router.push(`/(screens)/reports/student`);
                }}
            >
                <View style={styles.cardContent}>
                    <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.detail}>ID: {item.studentId}</Text>
                        <Text style={styles.detail}>{item.yearLevel}</Text>

                    </View>

                </View>
            </Pressable>
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.container, { paddingTop: insets.top }]}>




                    <FlatList
                        data={sampleStudents}
                        renderItem={renderStudent}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />



                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Students;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
    },
    scoredCard: {
        backgroundColor: '#d4edda',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    detail: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    scoreText: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '700',
        color: '#155724',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    markButton: {
        backgroundColor: '#007bff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    marked: {
        backgroundColor: '#28a745',
    },
    markButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    datePickerButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 16,
    },
    datePickerText: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: 'center',
    },
    scoreInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    saveButton: {
        backgroundColor: '#007bff',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});
