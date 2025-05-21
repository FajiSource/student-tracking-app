import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const sampleCourses = [
    { id: 'c1', name: '1101' },
    { id: 'c2', name: '1102' },
    { id: 'c3', name: '1103' },
];

const Blocks = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { courseId, levelId } = useLocalSearchParams();

    const [modalVisible, setModalVisible] = useState(false);
    const [blockName, setBlockName] = useState('');
    const [blocks, setBlocks] = useState([]);

    const handleCreateBlock = async () => {
        try {
            await axios.post('http://192.168.1.9:8000/api/blocks', {
                name: blockName,
                level_id: levelId,
                course_id: courseId,
            });
            setModalVisible(false);
            setBlockName('');
        } catch (error) {
            console.error('Error creating block:', error.response?.data || error.message);
        }
    };
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://192.168.1.9:8000/api/blocks/${levelId}/${courseId}`);

                setBlocks(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);
    const renderYearLevels = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                router.replace({
                    pathname:`/(screens)/students`,
                    params: {
                        courseId: courseId,
                        levelId: levelId,
                        blockId: item.id,
                    },
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
                        <Text style={styles.title}>Sections</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name="add-circle-outline" size={20} color="#fff" />
                        <Text style={styles.addButtonText}>Add Section {courseId}{levelId}</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={blocks}
                        renderItem={renderYearLevels}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Create Block</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter block name"
                                    value={blockName}
                                    onChangeText={setBlockName}
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={handleCreateBlock}
                                    >
                                        <Text style={styles.modalButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={[styles.modalButtonText, { color: '#000' }]}>
                                            Cancel
                                        </Text>
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

export default Blocks;


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
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#28a745',
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: '600',
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
