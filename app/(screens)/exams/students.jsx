import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
    Modal,
    TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { getYearName } from '../../../utils/tools';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.9:8000/api';
const DEFAULT_PROFILE = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

const Students = () => {
    const insets = useSafeAreaInsets();
    const [students, setStudents] = useState([]);
    const [scores, setScores] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [inputScore, setInputScore] = useState('');
    const [scoreId, setScoreId] = useState(null);
    const { examId, levelId } = useLocalSearchParams();
    const fetchStudents = async () => {
        fetch(`${BASE_URL}/exams/${examId}`)
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(err => {
                console.error(err);
                alert('Failed to load students');
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const openScoreModal = (student) => {
        setCurrentStudent(student);
        setInputScore(scores[student.id]?.toString() || '');
        setModalVisible(true);
        setScoreId(student.id);
    };

    const saveScore = async () => {
        if (inputScore.trim() === '') {
            alert('Please enter a score');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/exams/add-score`, {
                score_id: scoreId,
                score: inputScore,
            });

            setScores((prev) => ({
                ...prev,
                [currentStudent.id]: inputScore,
            }));
            fetchStudents();
            setModalVisible(false);
        } catch (error) {
            console.error(error);
            alert('Failed to save score');
        }
    };



    const renderStudent = ({ item }) => {

        const studentData = item.student;
        const fullName = `${studentData.fName} ${studentData.nName} ${studentData.lName}`;
        const profileUri = studentData.image ? `http://192.168.1.9:8000/storage/${studentData.image}` : DEFAULT_PROFILE;
        const score = item.score;
        const hasScore = score > 0;
        return (
            <View style={[styles.card, hasScore && styles.scoredCard]}>
                <View style={styles.cardContent}>
                    <Image source={{ uri: profileUri }} style={styles.profileImage} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{fullName}</Text>
                        <Text style={styles.detail}>ID: {studentData.id}</Text>
                        <Text style={styles.detail}>{getYearName(studentData?.level_id)}</Text>
                        {hasScore && <Text style={styles.scoreText}>Score: {score}</Text>}
                    </View>
                    <TouchableOpacity
                        style={[styles.markButton, hasScore && styles.marked]}
                        onPress={() => openScoreModal(item)}
                    >
                        <Text style={styles.markButtonText}>
                            {hasScore ? 'Edit Score' : 'Add Score'}
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
                    <FlatList
                        data={students}
                        renderItem={renderStudent}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.list}
                    />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>
                                    {currentStudent ? `Add Score for ${currentStudent.fName}` : ''}
                                </Text>
                                <TextInput
                                    style={styles.scoreInput}
                                    placeholder="Enter score"
                                    keyboardType="numeric"
                                    value={inputScore}
                                    onChangeText={setInputScore}
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
                                        onPress={saveScore}
                                    >
                                        <Text style={styles.modalButtonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
