import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const GuesOnly = ({ children }) => {
    const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user !== null) {
            router.replace("/(tabs)");
        }
    }, [user, authChecked]);

    if (!authChecked && !user) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            </SafeAreaView>
        )
    }
    return children;

}

export default GuesOnly;