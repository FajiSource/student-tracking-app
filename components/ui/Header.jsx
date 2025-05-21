import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../../assets/logo.png';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Image style={styles.logo} source={Logo} />
      </View>
      <Image
        style={styles.profileIcon}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 
        }}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
