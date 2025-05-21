import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Levels = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [levels, setLevels] = useState([]);
    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const response = await axios.get('http://192.168.1.9:8000/api/levels');
                setLevels(response.data);
            }
            catch (error) {
                console.error('Error fetching levels:', error);
            }
        }
        fetchLevels();
    }, []);
    const { courseId, courseName } = useLocalSearchParams();

    const renderYearLevels = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                router.push({
                    pathname: '/(screens)/courses/subjects',
                    params: {
                        courseId: courseId,
                        levelId: item.id,
                    },
                })
            }}
        >
            <Text style={styles.name}>{item.level}st Year</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.container, { paddingTop: insets.top }]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{courseName}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => router.push({
                            pathname: '/(screens)/courses/addSubject',
                            params: {

                                courseId: courseId
                            }
                        })}
                    >
                        <Ionicons name="add-circle-outline" size={20} color="#fff" />
                        <Text style={styles.addButtonText}>Add Subject</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={levels}
                        renderItem={renderYearLevels}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Levels;

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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
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
        marginBottom: 10
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
});
