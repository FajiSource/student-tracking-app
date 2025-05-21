import { Tabs } from 'expo-router';
import { FontAwesome ,Ionicons} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import UserOnly from '../../components/auth/UserOnly';
export default function TabLayout() {
    return (
        <>
            <UserOnly>
                <StatusBar value="auto" />
                <Tabs screenOptions={{ headerShown: false }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ color }) => <FontAwesome name='home' size={24} />,
                        }}
                    />
                    <Tabs.Screen
                        name="courses"
                        options={{
                            title: 'Courses',
                            tabBarIcon: ({ color }) => <Ionicons name='school' size={24} />,
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: 'Profile',
                            tabBarIcon: ({ color }) => <FontAwesome name='user' size={24} />,
                        }}
                    />
                </Tabs>
            </UserOnly>


        </>
    );
}
