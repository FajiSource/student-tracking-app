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
import { useUser } from '../../hooks/useUser';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';
import sampleImage from '../../assets/noImage.png';
import { useRouter } from 'expo-router';

const data = [
    {
        id: '831yr831gd31vd319', courseName: 'BSIT', image: sampleImage

    },
    { id: '831y831gd31vd319', courseName: 'BSCS', image: sampleImage },
    { id: '93ur94jf83jf38f3', courseName: 'CPE', image: sampleImage },
];

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
            <Image source={course.image} style={styles.image} />
            <Text style={styles.courseName}>{course.courseName}</Text>
        </Pressable>
    );
};

const Courses = () => {
    const { user } = useUser();
    const insets = useSafeAreaInsets();

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
                    data={data}
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
