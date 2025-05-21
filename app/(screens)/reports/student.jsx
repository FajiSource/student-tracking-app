import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const studentData = {
    name: 'John Doe',
    image: 'https://via.placeholder.com/100',
    exams: [
        { id: '1', subject: 'Math', score: 45, max: 50 },
        { id: '2', subject: 'Physics', score: 38, max: 50 },
        { id: '3', subject: 'Chemistry', score: 42, max: 50 },
    ],
};

const StudentScreen = () => {
    const total = studentData.exams.reduce((sum, exam) => sum + exam.score, 0);
    const average = (total / studentData.exams.length).toFixed(2);

    const renderExam = ({ item }) => (
        <View style={styles.examCard}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.score}>{item.score} / {item.max}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Image source={{ uri: studentData.image }} style={styles.image} />
                <Text style={styles.name}>{studentData.name}</Text>
            </View>
            <View style={styles.averageContainer}>
                <Text style={styles.averageText}>Average Score: {average}</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
                <Text style={styles.sectionTitle}>Score Chart</Text>
                <BarChart
                    data={{
                        labels: studentData.exams.map((e) => e.subject),
                        datasets: [
                            {
                                data: studentData.exams.map((e) => e.score),
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 40}
                    height={220}
                    yAxisSuffix=""
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: '#e6f0ff',
                        backgroundGradientFrom: '#e6f0ff',
                        backgroundGradientTo: '#e6f0ff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#007bff',
                        },
                    }}
                    style={{
                        borderRadius: 16,
                    }}
                />
            </View>

            <Text style={styles.sectionTitle}>Exam Results</Text>
            <FlatList
                data={studentData.exams}
                keyExtractor={(item) => item.id}
                renderItem={renderExam}
                contentContainerStyle={styles.examList}
            />


        </View>
    );
};

export default StudentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f6fa',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#007bff',
        marginBottom: 12,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#222',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
    },
    examList: {
        paddingBottom: 20,
    },
    examCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    subject: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    score: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007bff',
    },
    averageContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#e6f0ff',
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10
    },
    averageText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#003f88',
    },
});
