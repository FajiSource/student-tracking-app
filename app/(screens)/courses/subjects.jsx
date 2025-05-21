import React, { useEffect } from 'react';
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
import { getDayByID } from '../../../utils/tools';
const Subjects = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { levelId, courseId } = useLocalSearchParams();
    const [subjects, setSubjects] = React.useState([]);
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`http://192.168.1.9:8000/api/subjects/${levelId}/${courseId}`);
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubjects();
    }, [levelId, courseId]);

    const renderYearLevels = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
               
                router.push({
                    pathname: '/(screens)/courses/subject',
                    params: {
                        subjectName: item.name,
                        schedule1: item.first_schedule,
                        schedule2: item.second_schedule,
                        day1: item.first_schedule.day,
                        start1: item.first_schedule.start_time,
                        end1: item.first_schedule.end_time,
                        start2: item.second_schedule.start_time,
                        end2: item.second_schedule.end_time,
                        day2: item.second_schedule.day,
                    }
                });

            }}
        >
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

                <View style={[styles.container, { paddingTop: insets.top }]}>

                    <View style={styles.header}>
                        <Text style={styles.title}>Subjects</Text>
                    </View>


                    <FlatList
                        data={subjects}
                        renderItem={renderYearLevels}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Subjects;

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
