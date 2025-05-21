import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Image,
    FlatList,
    Pressable,
    Dimensions,
} from 'react-native';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';
import sampleImage from '../../assets/noImage.png';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const CourseBox = ({ course }) => {
    const router = useRouter();

    return (
        <Pressable
            style={styles.card}
            onPress={() =>
                router.push({
                    pathname: '/(screens)/courses/levels',
                    params: {
                        courseId: course.id,
                        courseName: course.courseName,
                    },
                })
            }


        >
            <Text style={styles.courseName}>{course.courseName}</Text>
        </Pressable>
    );
};

const Courses = () => {
    const { user } = useUser();
    const insets = useSafeAreaInsets();
    const [courses, setCourses] = useState([]);
   useEffect(() => {
    const fetchCourses = async () => {
        try {
          const response = await axios.get('http://192.168.1.9:8000/api/courses');

            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    fetchCourses();
}, []);

    return (
        <SafeAreaProvider
            style={{
                ...styles.container,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <Header />
            <SafeAreaView style={styles.listWrapper}>
                <FlatList
                    data={courses}
                    renderItem={({ item }) => <CourseBox course={item} />}
                    keyExtractor={(course) => course.id}
                    contentContainerStyle={styles.flatList}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Courses;

const cardWidth = (Dimensions.get('window').width - 48) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listWrapper: {
        flex: 1,
        paddingHorizontal: 16,
    },
    flatList: {
        paddingVertical: 20,
    },
    card: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 16,
    },
    courseName: {
        fontSize: 18,
        fontWeight: '600',
    },
});
