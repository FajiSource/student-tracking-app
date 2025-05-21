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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getYearName,yearlist } from '../../../utils/tools';


const Levels = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const yearList = yearlist;
    const { courseId, courseName } = useLocalSearchParams();
    const renderYearLevels = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                router.push({
                    pathname:`/(screens)/exams/exams`,
                    params: {
                        courseId: courseId,
                        levelId: item.id,
                        courseName: courseName,
                    },
                });
            }}
        >
            <Text style={styles.name}>{getYearName(item.level)}</Text>
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
                        data={yearList}
                        renderItem={renderYearLevels}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Levels;

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
