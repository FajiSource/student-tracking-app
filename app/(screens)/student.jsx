import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Student = () => {
    
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const {
        studentId,
        fName,
        lName,
        nName,
        age,
        email,
        phone,
        courseId,
        levelId,
        blockId,
        image
    } = useLocalSearchParams();
    const fullName = `${fName} ${nName} ${lName}`;

    const handleEdit = () => {
        router.push({
            pathname: '/(screens)/editStudent',
            params: {
                studentId,
                fName,
                lName,
                nName,
                age,
                email,
                phone,
                courseId,
                levelId,
                blockId,
                image
            }
        });
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
                        console.log(`Deleted student ${studentId}`);
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
                        <Image
                            source={{
                                uri: image !== 'null' && image
                                    ? `http://192.168.1.9:8000/storage/${image}`
                                    : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                            }}
                            style={styles.profileImage}
                        />
                    </View>

                    <View style={styles.card}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.value}>{fullName}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Age</Text>
                            <Text style={styles.value}>{age}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Student ID</Text>
                            <Text style={styles.value}>{studentId}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{email}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Phone</Text>
                            <Text style={styles.value}>{phone}</Text>
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
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20,
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
    card: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 12,
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
});
