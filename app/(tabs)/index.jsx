import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useUser } from '../../hooks/useUser';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/ui/Header';
import sampleImage from '../../assets/noImage.png';
import { useRouter } from 'expo-router';
const Home = () => {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const gotoManage = () => router.push("/(screens)/studentManagement");
  const gotoAttendance = () => router.push("/(screens)/attendance/attendance");
  const gotoExams = () => router.push("/(screens)/exams/courses");
  const gotoReports = () => router.push("/(screens)/reports/courses");
  return (
    <SafeAreaProvider
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        style={{
          paddingBottom: 10
        }}>
        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Calendar</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => {
              console.log('Selected date:', day.dateString);
            }}
            markedDates={{
              '2025-05-20': { selected: true, marked: true },
              '2025-05-22': { marked: true },
            }}
            theme={{
              selectedDayBackgroundColor: '#007bff',
              todayTextColor: '#007bff',
              arrowColor: '#007bff',
            }}
          />
        </View>


        <View style={styles.grid}>
          <Pressable style={styles.item} onPress={gotoManage}>
            <Image source={sampleImage} style={styles.image} />
            <Text style={styles.label}>Manage</Text>
          </Pressable>
          <Pressable style={styles.item} onPress={gotoAttendance}>
            <Image source={sampleImage} style={styles.image} />
            <Text style={styles.label}>Attendance</Text>
          </Pressable>
          <Pressable style={styles.item} onPress={gotoExams}>
            <Image source={sampleImage} style={styles.image} />
            <Text style={styles.label}>Exams</Text>
          </Pressable>
          <Pressable style={styles.item} onPress={gotoReports}>
            <Image source={sampleImage} style={styles.image} />
            <Text style={styles.label}>Reports</Text>
          </Pressable>
        </View>


        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ongoing Exams</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.examList}>
          <View style={styles.examCard}>
            <Image source={sampleImage} style={styles.examImage} />
            <View>
              <Text style={styles.examTitle}>Math</Text>
              <Text style={styles.examDetails}>IT - 1st Year</Text>
              <Text style={styles.examDetails}>Activity 1</Text>
            </View>
          </View>
          <View style={styles.examCard}>
            <Image source={sampleImage} style={styles.examImage} />
            <View>
              <Text style={styles.examTitle}>Math</Text>
              <Text style={styles.examDetails}>IT - 2nd Year</Text>
              <Text style={styles.examDetails}>Activity 6</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  item: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
  },
  sectionHeader: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAll: {
    fontSize: 14,
    color: '#007bff',
  },
  examList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  examCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    elevation: 1,
  },
  examImage: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  examDetails: {
    fontSize: 14,
    color: '#666',
  },
  calendarContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  calendar: {
    borderRadius: 10,
    elevation: 2,
  },

});
