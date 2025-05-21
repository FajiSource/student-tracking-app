import React, { useEffect, useState } from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getYearName } from '../../utils/tools';
import axios from 'axios';


const Students = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { courseId, levelId, blockId } = useLocalSearchParams();

    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://192.168.1.9:8000/api/students/block/${blockId}`);
                const data = response.data;
                setStudents(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);
    const renderStudent = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.replace({
            pathname: `/(screens)/student`,
            params: {
                studentId: item.id.toString(),
                fName: item.fName,
                lName: item.lName,
                nName: item.nName,
                age: String(item.age),
                phone: item.phone,
                email: item.email,
                image: item.image,
                courseId: courseId,
                levelId: levelId,
                blockId: blockId
            },
        })}
        >
            <View style={styles.cardContent}>
                <Image source={{ uri: item.image !== null ? `http://192.168.1.9:8000/storage/${item.image}` : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.profileImage} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.fName} {item.nName} {item.lName}</Text>
                    <Text style={styles.detail}>ID: {item.id}</Text>
                    <Text style={styles.detail}>{getYearName(item.level_id)}</Text>
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
                            onPress={() => router.push({
                                pathname: '/(screens)/addStudent',
                                params: {
                                    courseId: courseId,
                                    levelId: levelId,
                                    blockId: blockId,
                                },
                            })}
                        >
                            <Ionicons name="add-circle-outline" size={20} color="#fff" />
                            <Text style={styles.addButtonText}>Add Student</Text>
                        </TouchableOpacity>
                    </View>


                    <FlatList
                        data={students}
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
