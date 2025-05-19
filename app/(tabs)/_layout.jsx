import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from '../../context/UserContext';
export default function TabLayout() {
    return (
        <>
            <UserProvider>
                <StatusBar value="auto" />
                <Tabs  >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Course',
                            tabBarIcon: ({ color }) => <FontAwesome name='home' size={24} />,
                        }}
                    />
                    <Tabs.Screen
                        name="about"
                        options={{
                            title: 'About',
                            tabBarIcon: ({ color }) => <FontAwesome name='question' size={24} />,
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: 'Settings',
                            tabBarIcon: ({ color }) => <FontAwesome name='gear' size={24} />,
                        }}
                    />
                </Tabs>
            </UserProvider>

        </>
    );
}
