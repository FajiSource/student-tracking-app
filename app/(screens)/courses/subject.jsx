import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
} from 'react-native';

const SubjectDetails = () => {
    const { subjectName, schedule1, schedule2,day1,start1,
        end1, start2, end2, day2 
     } = useLocalSearchParams();

    const parsedSchedule1 = schedule1;
    const parsedSchedule2 = schedule2;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Subject Details</Text>

                <Text style={styles.label}>Subject Name</Text>
                <Text style={styles.value}>{subjectName}</Text>

                <Text style={styles.label}>Schedule 1</Text>
                <Text style={styles.value}>{day1}, {start1} - {start1}</Text>

                <Text style={styles.label}>Schedule 2</Text>
                <Text style={styles.value}>{day2}, {start2} - {start2}</Text>
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
