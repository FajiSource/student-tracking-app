import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
} from 'react-native';

const SubjectDetails = ({ route }) => {

    const {
        subjectName = 'Math',
        year = '1st Year',
        block = '1101',
        schedule1 = { day: 'Monday', startTime: '10:00 AM', endTime: '12:00 PM' },
        schedule2 = { day: 'Wednesday', startTime: '10:00 AM', endTime: '12:00 PM' },
    } = route?.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Subject Details</Text>

                <Text style={styles.label}>Subject Name</Text>
                <Text style={styles.value}>{subjectName}</Text>

                <Text style={styles.label}>Year</Text>
                <Text style={styles.value}>{year}</Text>

                <Text style={styles.label}>Block</Text>
                <Text style={styles.value}>{block}</Text>

                <Text style={styles.label}>Schedule 1</Text>
                <Text style={styles.value}>{schedule1.day}, {schedule1.startTime} - {schedule1.endTime}</Text>

                <Text style={styles.label}>Schedule 2</Text>
                <Text style={styles.value}>{schedule2.day}, {schedule2.startTime} - {schedule2.endTime}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SubjectDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    content: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        marginTop: 12,
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
});
