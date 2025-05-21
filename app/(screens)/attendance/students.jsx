import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
    const [attendance, setAttendance] = useState({});
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleAttendance = (id) => {
        setAttendance((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const renderStudent = ({ item }) => {
        const isPresent = attendance[item.id];

        return (
            <View style={[styles.card, isPresent && styles.presentCard]}>
                <View style={styles.cardContent}>
                    <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.detail}>ID: {item.studentId}</Text>
                        <Text style={styles.detail}>{item.yearLevel}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.markButton, isPresent && styles.marked]}
                        onPress={() => toggleAttendance(item.id)}
                    >
                        <Text style={styles.markButtonText}>
                            {isPresent ? 'Present' : 'Mark Present'}
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
