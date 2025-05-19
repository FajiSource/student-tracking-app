import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useUser } from '../../hooks/useUser';


const Home = () => {
  const {user} = useUser();
  return (
    <SafeAreaView>
      <Text>home {user}</Text>
      <Link href={'/(auth)/login'}>about link</Link>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})