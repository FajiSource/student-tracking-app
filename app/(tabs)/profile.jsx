import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUser } from '../../hooks/useUser';
import sampleImage from '../../assets/noImage.png';

const BASE_URL = 'http://192.168.1.9:8000'; 

const Profile = () => {
  const { user, logout } = useUser();

  const fullName = user?.fName && user?.lName ? `${user.fName} ${user.lName}` : user?.name || 'N/A';

  const imageSource = user?.image
    ? { uri: `${BASE_URL}/storage/${user.image}` }
    : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.profileHeader}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}} style={styles.avatar} />
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.email}>{user?.username}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Account Info</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Username</Text>
              <Text style={styles.infoValue}>{user?.username}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Role</Text>
              <Text style={styles.infoValue}>{user?.role}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>First Name</Text>
              <Text style={styles.infoValue}>{user?.fName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Name</Text>
              <Text style={styles.infoValue}>{user?.lName}</Text>
            </View>
          </View>

          <View style={styles.settingsSection}>
          
            <TouchableOpacity style={styles.settingItem} onPress={logout}>
              <Text style={styles.settingText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Profile;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:20
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsSection: {},
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
    color: '#007bff',
  },
});
