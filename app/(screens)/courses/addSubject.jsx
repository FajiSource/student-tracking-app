import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const blocks = ['1101', '1102', '1103'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AddSubject = () => {
    const router = useRouter();

    const [subjectName, setSubjectName] = useState('');
    const [year, setYear] = useState('');
    const [block, setBlock] = useState('');
    const [schedule1, setSchedule1] = useState({
        day: 'Monday',
        startTime: new Date(),
        endTime: new Date(),
        showStartPicker: false,
        showEndPicker: false,
    });

    const [schedule2, setSchedule2] = useState({
        day: 'Wednesday',
        startTime: new Date(),
        endTime: new Date(),
        showStartPicker: false,
        showEndPicker: false,
    });

    const formatTime = (time) =>
        time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    const handleAdd = () => {
        if (!subjectName || !year || !block || !schedule1.day || !schedule2.day || !schedule1.time || !schedule2.time) {
            alert('Please fill in all fields.');
            return;
        }

        alert(`Subject "${subjectName}" added!\nYear: ${year}\nBlock: ${block}\nSchedules:\n• ${schedule1.day} at ${schedule1.time}\n• ${schedule2.day} at ${schedule2.time}`);
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ padding: 16 }}
                style={{
                    paddingBottom:10
                }}
                >
                <Text style={styles.title}>Add New Subject</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter subject name"
                    value={subjectName}
                    onChangeText={setSubjectName}
                />

                <Text style={styles.label}>Select Year</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={year} onValueChange={(item) => setYear(item)}>
                        <Picker.Item label="Select Year" value="" />
                        {yearLevels.map((y) => (
                            <Picker.Item key={y} label={y} value={y} />
                        ))}
                    </Picker>
                </View>

                {year !== '' && (
                    <>
                        <Text style={styles.label}>Select Block</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={block} onValueChange={(item) => setBlock(item)}>
                                <Picker.Item label="Select Block" value="" />
                                {blocks.map((b) => (
                                    <Picker.Item key={b} label={b} value={b} />
                                ))}
                            </Picker>
                        </View>
                    </>
                )}

                {block !== '' && (
                    <>
                        <View style={styles.scheduleContainer}>
                            <Text style={styles.label}>Schedule 1</Text>


                            <Picker
                                selectedValue={schedule1.day}
                                onValueChange={(value) => setSchedule1({ ...schedule1, day: value })}
                            >
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                    <Picker.Item key={day} label={day} value={day} />
                                ))}
                            </Picker>
                            <TouchableOpacity
                                style={styles.timeInput}
                                onPress={() => setSchedule1({ ...schedule1, showStartPicker: true })}
                            >
                                <Text>Start: {formatTime(schedule1.startTime)}</Text>
                            </TouchableOpacity>
                            {schedule1.showStartPicker && (
                                <DateTimePicker
                                    value={schedule1.startTime}
                                    mode="time"
                                    display="default"
                                    onChange={(e, selected) => {
                                        if (selected)
                                            setSchedule1({ ...schedule1, startTime: selected, showStartPicker: false });
                                        else setSchedule1({ ...schedule1, showStartPicker: false });
                                    }}
                                />
                            )}


                            <TouchableOpacity
                                style={styles.timeInput}
                                onPress={() => setSchedule1({ ...schedule1, showEndPicker: true })}
                            >
                                <Text>End: {formatTime(schedule1.endTime)}</Text>
                            </TouchableOpacity>
                            {schedule1.showEndPicker && (
                                <DateTimePicker
                                    value={schedule1.endTime}
                                    mode="time"
                                    display="default"
                                    onChange={(e, selected) => {
                                        if (selected)
                                            setSchedule1({ ...schedule1, endTime: selected, showEndPicker: false });
                                        else setSchedule1({ ...schedule1, showEndPicker: false });
                                    }}
                                />
                            )}
                        </View>


                        <View style={styles.scheduleContainer}>
                            <Text style={styles.label}>Schedule 2</Text>


                            <Picker
                                selectedValue={schedule2.day}
                                onValueChange={(value) => setSchedule2({ ...schedule2, day: value })}
                            >
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                    <Picker.Item key={day} label={day} value={day} />
                                ))}
                            </Picker>


                            <TouchableOpacity
                                style={styles.timeInput}
                                onPress={() => setSchedule2({ ...schedule2, showStartPicker: true })}
                            >
                                <Text>Start: {formatTime(schedule2.startTime)}</Text>
                            </TouchableOpacity>
                            {schedule2.showStartPicker && (
                                <DateTimePicker
                                    value={schedule2.startTime}
                                    mode="time"
                                    display="default"
                                    onChange={(e, selected) => {
                                        if (selected)
                                            setSchedule2({ ...schedule2, startTime: selected, showStartPicker: false });
                                        else setSchedule2({ ...schedule2, showStartPicker: false });
                                    }}
                                />
                            )}


                            <TouchableOpacity
                                style={styles.timeInput}
                                onPress={() => setSchedule2({ ...schedule2, showEndPicker: true })}
                            >
                                <Text>End: {formatTime(schedule2.endTime)}</Text>
                            </TouchableOpacity>
                            {schedule2.showEndPicker && (
                                <DateTimePicker
                                    value={schedule2.endTime}
                                    mode="time"
                                    display="default"
                                    onChange={(e, selected) => {
                                        if (selected)
                                            setSchedule2({ ...schedule2, endTime: selected, showEndPicker: false });
                                        else setSchedule2({ ...schedule2, showEndPicker: false });
                                    }}
                                />
                            )}
                        </View>

                    </>
                )}

                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Add Subject</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddSubject;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 4,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    halfPicker: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    timeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
    button: {
        marginTop: 24,
        backgroundColor: '#007bff',
        paddingVertical: 14,
        borderRadius: 8,
        marginBottom:10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    scheduleContainer: {
        marginBottom: 20,
    },
    timeInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },

});
