import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    TextInput,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.9:8000/api';
// const levelId = 1; 

const ExamItem = ({ exam, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.examCard, exam.done ? styles.doneExam : styles.ongoingExam]}
    >
        <View>
            <Text style={styles.examName}>{exam.name}</Text>
            <Text style={styles.examDate}>{exam.startTime}</Text>
        </View>
        {exam.done && (
            <View style={styles.doneBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.doneText}>Done</Text>
            </View>
        )}
    </TouchableOpacity>
);

const Exams = () => {
    const router = useRouter();
    const [examsData, setExamsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [examName, setExamName] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [maxScore, setMaxScore] = useState('');
    const [passingScore, setPassingScore] = useState('');
    const [pickerMode, setPickerMode] = useState('date');
    const [activePicker, setActivePicker] = useState(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const { levelId, courseId } = useLocalSearchParams();
    useEffect(() => {
        fetch(`${BASE_URL}/exams/get-by-l/${levelId}`)
            .then(res => res.json())
            .then(data => setExamsData(data))
            .catch(err => {
                console.error(err);
                alert('Failed to load exams');
            });
    }, []);

    const showPicker = (which) => {
        setActivePicker(which);
        setPickerMode('date');
        which === 'start' ? setShowStartPicker(true) : setShowEndPicker(true);
    };

    const onChangeStart = (event, selectedDateTime) => {
        if (!selectedDateTime) return setShowStartPicker(false);

        const newDate = new Date(startTime);
        pickerMode === 'date'
            ? (newDate.setFullYear(selectedDateTime.getFullYear()),
                newDate.setMonth(selectedDateTime.getMonth()),
                newDate.setDate(selectedDateTime.getDate()),
                setPickerMode('time'))
            : (newDate.setHours(selectedDateTime.getHours()),
                newDate.setMinutes(selectedDateTime.getMinutes()),
                setShowStartPicker(false));
        setStartTime(newDate);
    };

    const onChangeEnd = (event, selectedDateTime) => {
        if (!selectedDateTime) return setShowEndPicker(false);

        const newDate = new Date(endTime);
        pickerMode === 'date'
            ? (newDate.setFullYear(selectedDateTime.getFullYear()),
                newDate.setMonth(selectedDateTime.getMonth()),
                newDate.setDate(selectedDateTime.getDate()),
                setPickerMode('time'))
            : (newDate.setHours(selectedDateTime.getHours()),
                newDate.setMinutes(selectedDateTime.getMinutes()),
                setShowEndPicker(false));
        setEndTime(newDate);
    };

    const handleAddExam = () => setModalVisible(true);

    const handleExamPress = (exam) => router.push({
        pathname: `/(screens)/exams/students`,
        params: {
            examId: exam.id,
            levelId: levelId,
            courseId: courseId,
        },
    });

    const saveExam = () => {
        // if (!examName.trim()) return alert('Please enter exam name');
        // if (!maxScore || isNaN(maxScore) || Number(maxScore) <= 0)
        //     return alert('Enter valid max score');
        // if (!passingScore || isNaN(passingScore) || Number(passingScore) > Number(maxScore))
        //     return alert('Passing score must be valid and ≤ max score');
        // if (endTime <= startTime) return alert('End time must be after start time');

        const payload = {
            name: examName,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            maxScore: Number(maxScore),
            passingScore: Number(passingScore),
            subject_id: 5,
        };
        axios.post(`${BASE_URL}/exams/add`, {...payload})

    };


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddExam}>
                <Ionicons name="add-circle-outline" size={24} color="#fff" />
                <Text style={styles.addButtonText}>Add Exam</Text>
            </TouchableOpacity>

            <FlatList
                data={examsData}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => (
                    <ExamItem exam={item} onPress={() => handleExamPress(item)} />
                )}
            />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Exam</Text>

                        <TextInput
                            placeholder="Exam Name"
                            style={styles.input}
                            value={examName}
                            onChangeText={setExamName}
                        />

                        <TouchableOpacity
                            onPress={() => showPicker('start')}
                            style={styles.datePickerButton}
                        >
                            <Text style={styles.datePickerText}>
                                Start: {startTime.toLocaleString()}
                            </Text>
                        </TouchableOpacity>
                        {showStartPicker && (
                            <DateTimePicker
                                value={startTime}
                                mode={pickerMode}
                                display="spinner"
                                onChange={onChangeStart}
                            />
                        )}

                        <TouchableOpacity
                            onPress={() => showPicker('end')}
                            style={styles.datePickerButton}
                        >
                            <Text style={styles.datePickerText}>
                                End: {endTime.toLocaleString()}
                            </Text>
                        </TouchableOpacity>
                        {showEndPicker && (
                            <DateTimePicker
                                value={endTime}
                                mode={pickerMode}
                                display="spinner"
                                onChange={onChangeEnd}
                            />
                        )}

                        <TextInput
                            placeholder="Max Score"
                            style={styles.input}
                            keyboardType="numeric"
                            value={maxScore}
                            onChangeText={setMaxScore}
                        />
                        <TextInput
                            placeholder="Passing Score"
                            style={styles.input}
                            keyboardType="numeric"
                            value={passingScore}
                            onChangeText={setPassingScore}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={saveExam}
                            >
                                <Text style={styles.modalButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Exams;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fa',
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        paddingVertical: 14,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 8,
    },
    examCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    doneExam: {
        backgroundColor: '#4CAF50',
    },
    ongoingExam: {
        backgroundColor: '#fff',
    },
    examName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    examDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    doneBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    doneText: {
        color: '#fff',
        marginLeft: 4,
        fontWeight: '700',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 16,
    },
    datePickerButton: {
        padding: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 16,
    },
    datePickerText: {
        fontSize: 16,
        fontWeight: '600',
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
