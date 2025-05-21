import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const sampleCourses = [
    { id: 'c1', name: '1st Year' },
    { id: 'c2', name: '2st Year' },
    { id: 'c3', name: '3st Year' },
];

const Course = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const renderYearLevels = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                router.push(`/(screens)/reports/levels`);
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
                        <Text style={styles.title}>Year Levels</Text>
                    </View>

                    <FlatList
                        data={sampleCourses}
                        renderItem={renderYearLevels}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Course;

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
});
