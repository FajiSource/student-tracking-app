import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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

    const renderStudent = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.replace(`/(screens)/student`)}>
            <View style={styles.cardContent}>
                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.detail}>ID: {item.studentId}</Text>
                    <Text style={styles.detail}>{item.yearLevel}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.container, { paddingTop: insets.top }]}>
                    

                    <View style={styles.header}>
                        <Text style={styles.title}>Students</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => router.push('/(screens)/addStudent')}
                        >
                            <Ionicons name="add-circle-outline" size={20} color="#fff" />
                            <Text style={styles.addButtonText}>Add Student</Text>
                        </TouchableOpacity>
                    </View>


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
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        color: '#007bff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
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
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    detail: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
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
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#28a745',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },

});
