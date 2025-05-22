import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const Students = () => {
    const insets = useSafeAreaInsets();
    const { subjectId } = useLocalSearchParams();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [attendance, setAttendance] = useState({});
    const [load,setLoad] = useState(false);

    const fetchAttendance = async () => {
        if (!subjectId) return;

        setLoading(true);
        try {

            const formattedDate = date.toISOString().split('T')[0];

            const response = await axios.get('http://192.168.1.9:8000/api/attendance', {
                params: {
                    subject_id: subjectId,
                    date: formattedDate,
                },
            });

            const json = response.data;


            setAttendanceData(json);
            const attendanceMap = {};
            json.forEach((record) => {
                attendanceMap[record.student_id] = record.present === true;
            });
            setAttendance(attendanceMap);
        } catch (error) {
            console.error('Failed to fetch attendance:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setAttendanceData([]);
        fetchAttendance();
    }, [subjectId, date,load]);

    const toggleAttendance = async (item, studentId) => {
        const newStatus = !attendance[studentId];

        setAttendance((prev) => ({
            ...prev,
            [studentId]: newStatus,
        }));

        if (newStatus) {
            try {

                const formattedDate = date.toISOString().split('T')[0];
                await axios.post('http://192.168.1.9:8000/api/attendance/mark', {
                    attendance_id: item.id
                });
                setLoad(!load);
            } catch (error) {
                console.error('Failed to mark attendance:', error);
            }
        }
    };


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const renderStudent = ({ item }) => {
        const isPresent = attendance[item.student_id] || false;

        return (
            <View style={[styles.card, item.present && styles.presentCard]}>
                <View style={styles.cardContent}>
                    <Image source={{ uri: item.student.image !== null ? `http://192.168.1.9:8000/storage/${item.student.image}` : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.profileImage} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.student.name}</Text>
                        <Text style={styles.detail}>ID: {item.student.id}</Text>
                        <Text style={styles.detail}>{item.student.yearLevel}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.markButton, item.present && styles.marked]}
                        disabled={item.present ? true : false}
                        onPress={() => toggleAttendance(item, item.student_id)}
                    >
                        <Text style={styles.markButtonText}>
                            {item.present ? 'Present' : 'Mark Present'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.container, { paddingTop: insets.top }]}>
                    <TouchableOpacity
                        onPress={() => setShowPicker(true)}
                        style={styles.datePickerButton}
                    >
                        <Text style={styles.datePickerText}>
                            Attendance Date: {date.toDateString()}
                        </Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                    {loading ? (
                        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
                    ) : (
                        <FlatList
                            data={attendanceData}
                            renderItem={renderStudent}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.list}
                        />
                    )}
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
    presentCard: {
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
});
